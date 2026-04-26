<script setup lang="ts">
const { state } = useWizardState()

definePageMeta({
  layout: 'wizard'
})

// Definição das colunas seguindo o padrão TanStack Table do Nuxt UI v4
const columns = [
  { accessorKey: 'name', header: 'Ingrediente' },
  { accessorKey: 'dm', header: 'MS (%)' },
  { accessorKey: 'cp', header: 'PB (%)' },
  { accessorKey: 'ndf', header: 'FDN (%)' },
  { accessorKey: 'me', header: 'EM (Mcal)' },
  { accessorKey: 'ge', header: 'EB (Mcal)' },
  { accessorKey: 'cost', header: 'Custo (R$/kg)' }
]

// Lista de ingredientes vindos do estado global
const selectedIngredients = computed(() => state.value.step3.selectedIngredients || [])

/**
 * Cálculos genéricos de métricas
 */
const calculateGeneralMetrics = () => {
  if (selectedIngredients.value.length > 0) {
    const totalEB = selectedIngredients.value.reduce((acc, ing) => {
      const dmFactor = (ing.dm || 0) / 100
      const geValue = ing.ge || 0
      return acc + (dmFactor * geValue)
    }, 0)
    state.value.step4.averageGrossEnergy = totalEB / selectedIngredients.value.length
  }
}

/**
 * Algoritmo específico para o objetivo Mantença
 */
const runMantencaAlgorithm = () => {
  // 1. Categorizar e selecionar o mais barato de cada categoria
  const categories = {
    volumoso: [] as typeof selectedIngredients.value,
    energetico: [] as typeof selectedIngredients.value,
    proteico: [] as typeof selectedIngredients.value
  }

  const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  selectedIngredients.value.forEach((ing) => {
    const cat = normalize(ing.category || '')
    if (cat.includes('volumoso')) categories.volumoso.push(ing)
    else if (cat.includes('energetico')) categories.energetico.push(ing)
    else if (cat.includes('proteico')) categories.proteico.push(ing)
  })

  // Selecionar o mais barato de cada (se houver)
  const getCheapest = (list: typeof selectedIngredients.value) =>
    list.length > 0 ? [...list].sort((a, b) => a.cost - b.cost)[0] : null

  const bestVolumoso = getCheapest(categories.volumoso)
  const bestEnergetico = getCheapest(categories.energetico)
  const bestProteico = getCheapest(categories.proteico)

  // Se faltar alguma categoria, não calculamos (a trava deve estar no passo 3, mas aqui garantimos segurança)
  if (!bestVolumoso || !bestEnergetico || !bestProteico) return

  // 3. Calcular EMDieta
  const meVolumoso = (bestVolumoso.me || 0) * 0.7
  const meEnergetico = (bestEnergetico.me || 0) * 0.2
  const meProteico = (bestProteico.me || 0) * 0.1
  state.value.step4.metabolizableEnergyDiet = meVolumoso + meEnergetico + meProteico

  // 4. Calcular EBDieta
  const geVolumoso = (bestVolumoso.ge || 0) * 0.7
  const geEnergetico = (bestEnergetico.ge || 0) * 0.2
  const geProteico = (bestProteico.ge || 0) * 0.1
  state.value.step4.grossEnergyDiet = geVolumoso + geEnergetico + geProteico

  // 5. Calcular Q
  state.value.step4.q = state.value.step4.grossEnergyDiet > 0
    ? state.value.step4.metabolizableEnergyDiet / state.value.step4.grossEnergyDiet
    : 0

  // 6. Calcular Km
  state.value.step4.km = (0.35 * state.value.step4.q) + 0.503

  // 7. Calcular EMm
  state.value.step4.metabolizableEnergyMaintenance = state.value.step4.km > 0
    ? (state.value.step1.netEnergyMaintenance || 0) / state.value.step4.km
    : 0

  // 8. Calcular CMSReal
  state.value.step4.actualDMIntake = state.value.step4.metabolizableEnergyDiet > 0
    ? state.value.step4.metabolizableEnergyMaintenance / state.value.step4.metabolizableEnergyDiet
    : 0

  console.log('[DEBUG CALC] Resultados Mantença:', {
    metabolizableEnergyDiet: state.value.step4.metabolizableEnergyDiet,
    grossEnergyDiet: state.value.step4.grossEnergyDiet,
    q: state.value.step4.q,
    km: state.value.step4.km,
    metabolizableEnergyMaintenance: state.value.step4.metabolizableEnergyMaintenance,
    actualDMIntake: state.value.step4.actualDMIntake
  })

  // Cálculo da Energia Bruta Média para exibição genérica
  calculateGeneralMetrics()
}

/**
 * Função para calcular os resultados da dieta baseado no objetivo
 */
const calculateDietResults = () => {
  if (selectedIngredients.value.length === 0) return

  const objective = state.value.step1.dietObjective

  switch (objective) {
    case 'mantença':
      runMantencaAlgorithm()
      break
    case 'Ganho de Peso':
      // TODO: Implementar algoritmo de Ganho de Peso
      break
    case 'Gestação':
      // TODO: Implementar algoritmo de Gestação
      break
    case 'Lactação':
      // TODO: Implementar algoritmo de Lactação
      break
    default:
      // Cálculo genérico ou padrão
      calculateGeneralMetrics()
      break
  }
}

// Executar cálculos sempre que os ingredientes ou o objetivo mudarem
watchEffect(() => {
  calculateDietResults()
})
</script>

<template>
  <UContainer class="step-container">
    <ClientOnly>
      <div class="step-header">
        <h2 class="step-title">
          Resumo da Seleção..
        </h2>
        <p class="step-description">
          Confira abaixo os ingredientes selecionados e seus respectivos valores nutricionais.
        </p>
      </div>

      <UCard class="result-card">
        <div v-if="selectedIngredients.length > 0">
          <UTable
            :data="selectedIngredients"
            :columns="columns"
            class="w-full"
          >
            <!-- Customização das células usando o padrão #[accessorKey]-cell -->

            <template #name-cell="{ cell }">
              <span class="font-semibold text-slate-900">
                {{ cell.getValue() }}
              </span>
            </template>

            <template #dm-cell="{ cell }">
              <span class="text-slate-600">
                {{ (cell.getValue() as number ?? 0).toFixed(1) }}%
              </span>
            </template>

            <template #cp-cell="{ cell }">
              <UBadge
                color="success"
                variant="soft"
                size="sm"
              >
                {{ (cell.getValue() as number ?? 0).toFixed(1) }}%
              </UBadge>
            </template>

            <template #ndf-cell="{ cell }">
              <span class="text-slate-600">
                {{ (cell.getValue() as number ?? 0).toFixed(1) }}%
              </span>
            </template>

            <template #me-cell="{ cell }">
              <span class="text-slate-600">
                {{ (cell.getValue() as number ?? 0).toFixed(2) }}
              </span>
            </template>

            <template #ge-cell="{ cell }">
              <span class="text-slate-600">
                {{ (cell.getValue() as number ?? 0).toFixed(2) }}
              </span>
            </template>

            <template #cost-cell="{ cell }">
              <span class="font-medium text-primary-600">
                R$ {{ (cell.getValue() as number ?? 0).toFixed(2) }}
              </span>
            </template>

            <template #empty>
              <div class="py-12 text-center">
                <p class="text-sm text-slate-500">
                  Nenhum dado para exibir.
                </p>
              </div>
            </template>
          </UTable>

          <div class="summary-footer mt-4 flex justify-between items-center">
            <p class="text-sm text-slate-500">
              Total de ingredientes selecionados: <span class="font-bold text-primary">
                {{ selectedIngredients.length }}
              </span>
            </p>
            <div class="eb-indicator flex items-center gap-2">
              <span class="text-sm font-medium text-slate-500">
                Energia Bruta Média:
              </span>
              <UBadge
                color="primary"
                variant="solid"
                size="lg"
              >
                {{ state.step4.averageGrossEnergy.toFixed(4) }} Mcal/kg
              </UBadge>
            </div>
          </div>

          <!-- Nova seção de análise detalhada (Mantença) -->
          <div
            v-if="state.step1.dietObjective === 'mantença' && state.step4.actualDMIntake > 0"
            class="nutritional-analysis mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div class="analysis-item p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Energia Dieta (EM/EB)
              </span>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-xl font-black text-slate-800">
                  {{ state.step4.metabolizableEnergyDiet.toFixed(2) }}
                </span>
                <span class="text-sm text-slate-500">
                  EM /
                </span>
                <span class="text-xl font-black text-slate-800">
                  {{ state.step4.grossEnergyDiet.toFixed(2) }}
                </span>
                <span class="text-sm text-slate-500">
                  EB
                </span>
              </div>
            </div>

            <div class="analysis-item p-4 rounded-xl bg-primary-50 border border-primary-100">
              <span class="text-xs font-bold text-primary-400 uppercase tracking-wider">
                Fatores Q & Km
              </span>
              <div class="flex items-baseline gap-4 mt-1">
                <div>
                  <span class="text-xs text-primary-600 font-medium">
                    Q:
                  </span>
                  <span class="text-xl font-black text-primary-700 ml-1">
                    {{ state.step4.q.toFixed(3) }}
                  </span>
                </div>
                <div>
                  <span class="text-xs text-primary-600 font-medium">
                    Km:
                  </span>
                  <span class="text-xl font-black text-primary-700 ml-1">
                    {{ state.step4.km.toFixed(3) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="analysis-item p-4 rounded-xl bg-green-600 border border-green-700 text-white">
              <span class="text-xs font-bold text-green-200 uppercase tracking-wider">
                Consumo Real Estimado
              </span>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-2xl font-black">
                  {{ state.step4.actualDMIntake.toFixed(2) }}
                </span>
                <span class="text-sm text-green-100">
                  Kg MS/dia
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="empty-results py-20 text-center"
        >
          <UIcon
            name="i-heroicons-beaker"
            class="w-12 h-12 text-slate-300 mb-4"
          />
          <h3 class="text-lg font-medium text-slate-900">
            Nenhum ingrediente selecionado
          </h3>
          <p class="text-slate-500 mb-6">
            Volte ao passo anterior para selecionar os alimentos da dieta.
          </p>
          <UButton
            to="/calc/passo-3/ingredientes"
            color="primary"
            variant="soft"
            icon="i-heroicons-arrow-left"
          >
            Voltar para Ingredientes
          </UButton>
        </div>
      </UCard>

      <div class="actions-footer mt-8 flex justify-between">
        <UButton
          to="/calc/passo-3/ingredientes"
          variant="outline"
          color="neutral"
          icon="i-heroicons-arrow-left"
        >
          Voltar
        </UButton>

        <UButton
          color="primary"
          trailing-icon="i-heroicons-check-circle"
          size="lg"
        >
          Finalizar Cálculo
        </UButton>
      </div>
    </ClientOnly>
  </UContainer>
</template>

<style lang="scss" scoped>
.step-container {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.step-header {
  margin-bottom: 2rem;
  text-align: left;

  .step-title {
    font-size: 1.875rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
  }

  .step-description {
    font-size: 1.125rem;
    color: #64748b;
  }
}

.result-card {
  background: white;
  border-radius: 1.25rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.summary-footer {
  padding: 1.25rem;
  border-top: 1px solid #f1f5f9;
  background-color: #f8fafc;
}

.empty-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
