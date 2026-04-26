<script setup lang="ts">
definePageMeta({
  layout: 'wizard'
})

const { state, validationErrors } = useWizardState()

const balanceModes = [
  {
    label: 'Automático',
    value: 'automatico',
    icon: 'i-heroicons-cpu-chip',
    description: 'O sistema sugere a melhor combinação para você.'
  },
  {
    label: 'Manual',
    value: 'manual',
    icon: 'i-heroicons-beaker',
    description: 'Você escolhe e ajusta cada ingrediente detalhadamente.'
  }
]

// Usamos useAsyncData com uma chave única para evitar conflitos com o Vue Router
const { data: rawData, pending } = await useAsyncData('ingredients-data', () => $fetch('/api/ingredients').catch(() => null))

// Mapeia os dados da API (em português) para o formato em inglês
const data = computed(() => {
  if (!rawData.value?.ingredientes) return null
  return {
    ingredientes: rawData.value.ingredientes.map((ing: any) => ({
      id: ing.id,
      name: ing.nome || ing.name,
      category: ing.categoria || ing.category,
      dm: ing.ms || ing.dm,
      cp: ing.pb || ing.cp,
      ndf: ing.fdn || ing.ndf,
      me: ing.em || ing.me,
      ge: ing.eb || ing.ge,
      cost: ing.custo || ing.cost
    }))
  }
})

// Fallback com a base completa (garante funcionamento imediato e busca offline)
const fallbackIngredients = [
  { id: 1, name: 'Milho moído', category: 'energético', dm: 88, cp: 8.8, ndf: 10.0, me: 3.15, cost: 1.60 },
  { id: 2, name: 'Milho grão inteiro', category: 'energético', dm: 88, cp: 8.5, ndf: 9.0, me: 3.05, cost: 1.55 },
  { id: 3, name: 'Sorgo moído', category: 'energético', dm: 89, cp: 10.0, ndf: 12.0, me: 2.95, cost: 1.45 },
  { id: 4, name: 'Farelo de trigo', category: 'energético', dm: 89, cp: 16.0, ndf: 38.0, me: 2.45, cost: 1.35 },
  { id: 5, name: 'Polpa cítrica peletizada', category: 'energético', dm: 90, cp: 7.0, ndf: 22.0, me: 2.80, cost: 1.50 },
  { id: 6, name: 'Casquinha de soja', category: 'fibroso energético', dm: 89, cp: 12.0, ndf: 60.0, me: 2.35, cost: 1.20 },
  { id: 7, name: 'Melaço de cana', category: 'energético', dm: 75, cp: 4.0, ndf: 0.0, me: 2.30, cost: 1.10 },
  { id: 8, name: 'Farelo de arroz integral', category: 'energético', dm: 89, cp: 14.0, ndf: 14.0, me: 2.85, cost: 1.40 },
  { id: 9, name: 'Farelo de arroz desengordurado', category: 'energético', dm: 90, cp: 16.0, ndf: 16.0, me: 2.45, cost: 1.35 },
  { id: 10, name: 'Trigo grão', category: 'energético', dm: 89, cp: 13.0, ndf: 12.0, me: 3.00, cost: 1.55 },
  { id: 11, name: 'Farelo de soja 46%', category: 'proteico', dm: 89, cp: 46.0, ndf: 12.0, me: 2.90, cost: 2.45 },
  { id: 12, name: 'Farelo de soja 48%', category: 'proteico', dm: 89, cp: 48.0, ndf: 11.0, me: 2.92, cost: 2.55 },
  { id: 13, name: 'Farelo de algodão 28%', category: 'proteico', dm: 90, cp: 28.0, ndf: 32.0, me: 2.30, cost: 1.70 },
  { id: 14, name: 'Farelo de algodão 38%', category: 'proteico', dm: 90, cp: 38.0, ndf: 28.0, me: 2.45, cost: 1.95 },
  { id: 15, name: 'Caroço de algodão', category: 'proteico energético', dm: 92, cp: 23.0, ndf: 45.0, me: 2.75, cost: 1.80 },
  { id: 16, name: 'Farelo de amendoim', category: 'proteico', dm: 90, cp: 45.0, ndf: 14.0, me: 2.85, cost: 2.10 },
  { id: 17, name: 'Glúten de milho 21%', category: 'proteico', dm: 90, cp: 21.0, ndf: 34.0, me: 2.70, cost: 1.75 },
  { id: 18, name: 'Glúten de milho 60%', category: 'proteico', dm: 90, cp: 60.0, ndf: 8.0, me: 3.10, cost: 3.10 },
  { id: 19, name: 'DDG milho', category: 'proteico energético', dm: 90, cp: 28.0, ndf: 32.0, me: 2.95, cost: 1.95 },
  { id: 20, name: 'Ureia pecuária', category: 'nitrogenado', dm: 99, cp: 281.0, ndf: 0.0, me: 0.00, cost: 2.30 },
  { id: 21, name: 'Silagem de milho', category: 'volumoso', dm: 35, cp: 8.0, ndf: 45.0, me: 2.20, cost: 0.45 },
  { id: 22, name: 'Silagem de sorgo', category: 'volumoso', dm: 32, cp: 7.0, ndf: 50.0, me: 2.00, cost: 0.42 },
  { id: 23, name: 'Pré-secado de capim', category: 'volumoso', dm: 55, cp: 12.0, ndf: 58.0, me: 1.95, cost: 0.70 },
  { id: 24, name: 'Feno tifton', category: 'volumoso', dm: 88, cp: 12.0, ndf: 68.0, me: 1.75, cost: 0.95 },
  { id: 25, name: 'Feno coast-cross', category: 'volumoso', dm: 88, cp: 11.0, ndf: 70.0, me: 1.70, cost: 0.90 },
  { id: 26, name: 'Feno braquiária', category: 'volumoso', dm: 88, cp: 8.0, ndf: 74.0, me: 1.55, cost: 0.78 },
  { id: 27, name: 'Capim mombaça verde', category: 'volumoso', dm: 24, cp: 12.0, ndf: 62.0, me: 1.90, cost: 0.30 },
  { id: 28, name: 'Capim braquiária verde', category: 'volumoso', dm: 28, cp: 9.0, ndf: 68.0, me: 1.75, cost: 0.28 },
  { id: 29, name: 'Capim mombaça seco', category: 'volumoso', dm: 85, cp: 6.0, ndf: 74.0, me: 1.45, cost: 0.35 },
  { id: 30, name: 'Palhada de milho', category: 'volumoso', dm: 88, cp: 4.0, ndf: 78.0, me: 1.25, cost: 0.22 },
  { id: 31, name: 'Bagaço de cana in natura', category: 'volumoso', dm: 50, cp: 2.5, ndf: 82.0, me: 1.05, cost: 0.18 },
  { id: 32, name: 'Bagaço de cana hidrolisado', category: 'volumoso', dm: 55, cp: 3.0, ndf: 72.0, me: 1.45, cost: 0.28 },
  { id: 33, name: 'Cana-de-açúcar picada', category: 'volumoso', dm: 30, cp: 3.0, ndf: 48.0, me: 1.95, cost: 0.25 },
  { id: 34, name: 'Casca de café', category: 'fibroso', dm: 89, cp: 10.0, ndf: 58.0, me: 1.65, cost: 0.40 },
  { id: 35, name: 'Casca de amendoim', category: 'fibroso', dm: 90, cp: 8.0, ndf: 70.0, me: 1.30, cost: 0.38 },
  { id: 36, name: 'Palha de arroz', category: 'fibroso', dm: 89, cp: 4.0, ndf: 76.0, me: 1.10, cost: 0.20 },
  { id: 37, name: 'Capim elefante verde', category: 'volumoso', dm: 22, cp: 10.0, ndf: 64.0, me: 1.80, cost: 0.27 },
  { id: 38, name: 'Silagem de capim', category: 'volumoso', dm: 30, cp: 8.0, ndf: 60.0, me: 1.75, cost: 0.38 },
  { id: 39, name: 'Farelo de girassol', category: 'proteico', dm: 90, cp: 30.0, ndf: 28.0, me: 2.10, cost: 1.65 },
  { id: 40, name: 'Farelo de canola', category: 'proteico', dm: 90, cp: 36.0, ndf: 18.0, me: 2.55, cost: 1.85 },
  { id: 41, name: 'Levedura de cana seca', category: 'proteico', dm: 93, cp: 42.0, ndf: 0.0, me: 3.00, cost: 2.80 },
  { id: 42, name: 'Polpa de citrus úmida', category: 'energético', dm: 25, cp: 2.0, ndf: 6.0, me: 0.75, cost: 0.35 },
  { id: 43, name: 'Resíduo de cervejaria úmido', category: 'proteico energético', dm: 22, cp: 6.0, ndf: 12.0, me: 0.65, cost: 0.45 },
  { id: 44, name: 'Gordura protegida', category: 'energético', dm: 99, cp: 0.0, ndf: 0.0, me: 7.50, cost: 6.50 },
  { id: 45, name: 'Calcário calcítico', category: 'mineral', dm: 99, cp: 0.0, ndf: 0.0, me: 0.00, cost: 0.40 },
  { id: 46, name: 'Fosfato bicálcico', category: 'mineral', dm: 99, cp: 0.0, ndf: 0.0, me: 0.00, cost: 3.50 },
  { id: 47, name: 'Sal comum', category: 'mineral', dm: 99, cp: 0.0, ndf: 0.0, me: 0.00, cost: 1.20 },
  { id: 48, name: 'Núcleo mineral', category: 'mineral', dm: 98, cp: 0.0, ndf: 0.0, me: 0.00, cost: 4.80 },
  { id: 49, name: 'Ionóforo (Monensina)', category: 'aditivo', dm: 95, cp: 0.0, ndf: 0.0, me: 0.00, cost: 85.00 },
  { id: 50, name: 'Virginiamicina', category: 'aditivo', dm: 95, cp: 0.0, ndf: 0.0, me: 0.00, cost: 120.00 }
]

// Normaliza strings para busca insensível a acentos
const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

// Prioriza os dados da API, mas usa o fallback de 10 itens se necessário
const availableIngredients = computed(() => {
  const list = data.value?.ingredientes || fallbackIngredients
  return list.slice(0, 10)
})

// Lógica de busca insensível a acentos
const searchQuery = ref('')
const searchResults = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []

  const allList = data.value?.ingredientes || fallbackIngredients
  const query = normalize(searchQuery.value)

  return allList.filter(ing =>
    normalize(ing.name).includes(query) ||
    normalize(ing.category).includes(query)
  )
})

const toggleIngredient = (ing: any) => {
  const index = state.value.step3.selectedIngredients.findIndex(i => i.id === ing.id)
  if (index === -1) {
    state.value.step3.selectedIngredients.push({ ...ing })
  } else {
    state.value.step3.selectedIngredients.splice(index, 1)
  }
}

const isSelected = (id: number) => {
  return state.value.step3.selectedIngredients.some(i => i.id === id)
}
</script>

<template>
  <UContainer class="step-container">
    <!-- Resumo das Etapas Anteriores -->
    <UAlert
      icon="i-heroicons-calculator"
      color="primary"
      variant="subtle"
      title="Dados Consolidados"
      :description="`Animal: ${state.step1.animalRace} | CMS: ${state.step1.initialCMSEstimate.toFixed(2)} kg/dia | Sistema: ${state.step2.productionSystem.replace('_', ' ')}`"
    />

    <!-- Escolha do Modo -->
    <UFormField
      label="Modo de Balanceamento"
      class="form-field"
    >
      <WizardSelectionCards
        v-model="state.step3.balanceMode"
        :items="balanceModes"
      />
    </UFormField>

    <!-- Alerta de Validação de Ingredientes -->
    <UAlert
      v-if="validationErrors.selectedIngredients"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      title="Atenção: Seleção Incompleta"
      :description="validationErrors.selectedIngredients"
      class="mb-4"
    />

    <USeparator v-if="state.step3.balanceMode" />

    <!-- Fluxo Manual: Lista de Ingredientes (Top 10) -->
    <div
      v-if="state.step3.balanceMode === 'manual'"
      class="manual-flow"
    >
      <!-- Seção de Selecionados (Resumo) -->
      <div
        v-if="state.step3.selectedIngredients.length > 0"
        class="selected-section"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold text-primary flex items-center gap-2">
            <UIcon name="i-heroicons-check-badge" />
            Ingredientes Selecionados ({{ state.step3.selectedIngredients.length }})
          </h3>
          <UButton
            color="error"
            variant="ghost"
            size="xs"
            label="Limpar tudo"
            icon="i-heroicons-trash"
            @click="state.step3.selectedIngredients = []"
          />
        </div>
        <div class="ingredients-flex mb-8">
          <UCard
            v-for="ing in state.step3.selectedIngredients"
            :key="'selected-' + ing.id"
            class="ingredient-card selected"
            @click="toggleIngredient(ing)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="text-primary w-5 h-5"
                />
                <div class="flex flex-col">
                  <span class="font-bold text-slate-800">{{ ing.name }}</span>
                  <span class="text-[10px] text-slate-400 uppercase font-semibold">
                    {{ ing.category }}
                  </span>
                </div>
              </div>
            </div>
          </UCard>
        </div>
        <USeparator class="mb-8" />
      </div>

      <UFormField
        label="Principais Ingredientes"
        :error="validationErrors.selectedIngredients"
        class="form-field"
      >
        <!-- Estado de Carregamento -->
        <div
          v-if="pending"
          class="flex flex-col items-center justify-center py-10 gap-4"
        >
          <UIcon
            name="i-heroicons-arrow-path"
            class="w-8 h-8 text-primary animate-spin"
          />
          <p class="text-sm text-slate-500 font-medium">
            Buscando ingredientes...
          </p>
        </div>

        <div
          v-else
          class="ingredients-flex"
        >
          <UCard
            v-for="ing in availableIngredients"
            :id="'ingredient-' + ing.id"
            :key="ing.id"
            class="ingredient-card"
            :class="{ selected: isSelected(ing.id) }"
            @click="toggleIngredient(ing)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UCheckbox
                  :model-value="isSelected(ing.id)"
                  color="primary"
                  readonly
                />
                <div class="flex flex-col">
                  <span class="font-bold text-slate-800">{{ ing.name }}</span>
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[10px] text-slate-400 uppercase tracking-tight font-semibold">
                      PB: {{ ing.cp ?? 0 }}% | EM: {{ ing.me ?? 0 }} | R$ {{ (ing.cost ?? 0).toFixed(2) }}/kg
                    </span>
                  </div>
                </div>
              </div>
              <UIcon
                v-if="isSelected(ing.id)"
                name="i-heroicons-check-circle"
                class="text-primary w-5 h-5"
              />
            </div>
          </UCard>
        </div>

        <!-- Barra de Busca -->
        <div class="search-section">
          <UFormField
            label="Buscar outros ingredientes"
            class="form-field"
          >
            <UInput
              v-model="searchQuery"
              icon="i-heroicons-magnifying-glass"
              placeholder="Ex: Farelo, Soja, Silagem..."
              size="lg"
              autocomplete="off"
            />
          </UFormField>
        </div>

        <!-- Resultados da Busca -->
        <div
          v-if="searchQuery.length >= 2"
          class="search-results"
        >
          <p class="results-info">
            Resultados para "{{ searchQuery }}":
          </p>

          <div
            v-if="searchResults.length > 0"
            class="ingredients-flex"
          >
            <UCard
              v-for="ing in searchResults"
              :key="'search-' + ing.id"
              class="ingredient-card"
              :class="{ selected: isSelected(ing.id) }"
              @click="toggleIngredient(ing)"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <UCheckbox
                    :model-value="isSelected(ing.id)"
                    color="primary"
                    readonly
                  />
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-800">{{ ing.name }}</span>
                    <div class="flex flex-col gap-0.5">
                      <span class="text-[10px] text-slate-400 uppercase tracking-tight font-semibold">
                        PB: {{ ing.cp ?? 0 }}% | EM: {{ ing.me ?? 0 }} | R$ {{ (ing.cost ?? 0).toFixed(2) }}/kg
                      </span>
                    </div>
                  </div>
                </div>
                <UIcon
                  v-if="isSelected(ing.id)"
                  name="i-heroicons-check-circle"
                  class="text-primary w-5 h-5"
                />
              </div>
            </UCard>
          </div>

          <div
            v-else
            class="empty-results py-4"
          >
            <p class="text-sm text-slate-400 italic">
              Nenhum outro ingrediente encontrado para esta busca.
            </p>
          </div>
        </div>

        <!-- Caso não existam ingredientes -->
        <div
          v-if="!pending && availableIngredients.length === 0"
          class="empty-state"
        >
          <UAlert
            title="Nenhum ingrediente encontrado"
            color="warning"
            variant="soft"
            icon="i-heroicons-exclamation-triangle"
          />
        </div>
      </UFormField>
    </div>

    <!-- Fluxo Automático -->
    <div
      v-if="state.step3.balanceMode === 'automatico'"
      class="auto-flow"
    >
      <div class="info-box">
        <UIcon
          name="i-heroicons-light-bulb"
          class="w-6 h-6 text-primary"
        />
        <p class="text-sm text-slate-600">
          No modo automático, o sistema otimiza os custos e garante que as exigências nutricionais sejam atendidas com os melhores ingredientes da estação.
        </p>
      </div>
    </div>
  </UContainer>
</template>

<style lang="scss" scoped>
.step-container {
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.form-field {
  width: 100%;

  :deep(label) {
    color: rgb(7, 52, 17);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.25rem;
    display: block;
  }
}

.ingredients-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .ingredient-card {
    flex: 1 1 calc(25% - 0.75rem);
    min-width: 200px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid #e2e8f0;

    &:hover {
      border-color: #075a26;
      background-color: #f8fafc;
      transform: translateY(-2px);
    }

    &.selected {
      border-color: #075a26;
      background-color: #f0fdf4;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
  }
}

.category-section {
  margin-bottom: 2.5rem;

  .category-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 0.5rem;

    .category-title {
      color: rgb(7, 52, 17);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.9rem;
    }
  }
}

.info-box {
  background-color: #f0fdf4;
  border: 1px dashed #075a26;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.empty-state {
  padding: 2rem 0;
}

.search-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px dashed var(--color-slate-200);
}

.search-results {
  margin-top: 1.5rem;

  .results-info {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-slate-500);
    margin-bottom: 1rem;
  }
}

.selected-section {
  background: var(--color-primary-50);
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  border: 1px solid var(--color-primary-100);

  .ingredient-card {
    border-color: var(--color-primary-300);
  }
}

@media (max-width: 1200px) {
  .ingredients-flex .ingredient-card {
    flex: 1 1 calc(33.333% - 0.67rem);
  }
}

@media (max-width: 900px) {
  .ingredients-flex .ingredient-card {
    flex: 1 1 calc(50% - 0.5rem);
  }
}

@media (max-width: 600px) {
  .ingredients-flex .ingredient-card {
    flex: 1 1 100%;
  }
}
</style>
