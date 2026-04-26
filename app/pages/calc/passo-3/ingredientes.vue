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
const { data, pending, error } = await useAsyncData('ingredients-data', () => $fetch('/api/ingredients').catch(() => null))

// Fallback com a base completa (garante funcionamento imediato e busca offline)
const fallbackIngredients = [
  { "id": 1, "nome": "Milho moído", "categoria": "energético", "ms": 88, "pb": 8.8, "fdn": 10.0, "em": 3.15, "custo": 1.60 },
  { "id": 2, "nome": "Milho grão inteiro", "categoria": "energético", "ms": 88, "pb": 8.5, "fdn": 9.0, "em": 3.05, "custo": 1.55 },
  { "id": 3, "nome": "Sorgo moído", "categoria": "energético", "ms": 89, "pb": 10.0, "fdn": 12.0, "em": 2.95, "custo": 1.45 },
  { "id": 4, "nome": "Farelo de trigo", "categoria": "energético", "ms": 89, "pb": 16.0, "fdn": 38.0, "em": 2.45, "custo": 1.35 },
  { "id": 5, "nome": "Polpa cítrica peletizada", "categoria": "energético", "ms": 90, "pb": 7.0, "fdn": 22.0, "em": 2.80, "custo": 1.50 },
  { "id": 6, "nome": "Casquinha de soja", "categoria": "fibroso energético", "ms": 89, "pb": 12.0, "fdn": 60.0, "em": 2.35, "custo": 1.20 },
  { "id": 7, "nome": "Melaço de cana", "categoria": "energético", "ms": 75, "pb": 4.0, "fdn": 0.0, "em": 2.30, "custo": 1.10 },
  { "id": 8, "nome": "Farelo de arroz integral", "categoria": "energético", "ms": 89, "pb": 14.0, "fdn": 14.0, "em": 2.85, "custo": 1.40 },
  { "id": 9, "nome": "Farelo de arroz desengordurado", "categoria": "energético", "ms": 90, "pb": 16.0, "fdn": 16.0, "em": 2.45, "custo": 1.35 },
  { "id": 10, "nome": "Trigo grão", "categoria": "energético", "ms": 89, "pb": 13.0, "fdn": 12.0, "em": 3.00, "custo": 1.55 },
  { "id": 11, "nome": "Farelo de soja 46%", "categoria": "proteico", "ms": 89, "pb": 46.0, "fdn": 12.0, "em": 2.90, "custo": 2.45 },
  { "id": 12, "nome": "Farelo de soja 48%", "categoria": "proteico", "ms": 89, "pb": 48.0, "fdn": 11.0, "em": 2.92, "custo": 2.55 },
  { "id": 13, "nome": "Farelo de algodão 28%", "categoria": "proteico", "ms": 90, "pb": 28.0, "fdn": 32.0, "em": 2.30, "custo": 1.70 },
  { "id": 14, "nome": "Farelo de algodão 38%", "categoria": "proteico", "ms": 90, "pb": 38.0, "fdn": 28.0, "em": 2.45, "custo": 1.95 },
  { "id": 15, "nome": "Caroço de algodão", "categoria": "proteico energético", "ms": 92, "pb": 23.0, "fdn": 45.0, "em": 2.75, "custo": 1.80 },
  { "id": 16, "nome": "Farelo de amendoim", "categoria": "proteico", "ms": 90, "pb": 45.0, "fdn": 14.0, "em": 2.85, "custo": 2.10 },
  { "id": 17, "nome": "Glúten de milho 21%", "categoria": "proteico", "ms": 90, "pb": 21.0, "fdn": 34.0, "em": 2.70, "custo": 1.75 },
  { "id": 18, "nome": "Glúten de milho 60%", "categoria": "proteico", "ms": 90, "pb": 60.0, "fdn": 8.0, "em": 3.10, "custo": 3.10 },
  { "id": 19, "nome": "DDG milho", "categoria": "proteico energético", "ms": 90, "pb": 28.0, "fdn": 32.0, "em": 2.95, "custo": 1.95 },
  { "id": 20, "nome": "Ureia pecuária", "categoria": "nitrogenado", "ms": 99, "pb": 281.0, "fdn": 0.0, "em": 0.00, "custo": 2.30 },
  { "id": 21, "nome": "Silagem de milho", "categoria": "volumoso", "ms": 35, "pb": 8.0, "fdn": 45.0, "em": 2.20, "custo": 0.45 },
  { "id": 22, "nome": "Silagem de sorgo", "categoria": "volumoso", "ms": 32, "pb": 7.0, "fdn": 50.0, "em": 2.00, "custo": 0.42 },
  { "id": 23, "nome": "Pré-secado de capim", "categoria": "volumoso", "ms": 55, "pb": 12.0, "fdn": 58.0, "em": 1.95, "custo": 0.70 },
  { "id": 24, "nome": "Feno tifton", "categoria": "volumoso", "ms": 88, "pb": 12.0, "fdn": 68.0, "em": 1.75, "custo": 0.95 },
  { "id": 25, "nome": "Feno coast-cross", "categoria": "volumoso", "ms": 88, "pb": 11.0, "fdn": 70.0, "em": 1.70, "custo": 0.90 },
  { "id": 26, "nome": "Feno braquiária", "categoria": "volumoso", "ms": 88, "pb": 8.0, "fdn": 74.0, "em": 1.55, "custo": 0.78 },
  { "id": 27, "nome": "Capim mombaça verde", "categoria": "volumoso", "ms": 24, "pb": 12.0, "fdn": 62.0, "em": 1.90, "custo": 0.30 },
  { "id": 28, "nome": "Capim braquiária verde", "categoria": "volumoso", "ms": 28, "pb": 9.0, "fdn": 68.0, "em": 1.75, "custo": 0.28 },
  { "id": 29, "nome": "Capim mombaça seco", "categoria": "volumoso", "ms": 85, "pb": 6.0, "fdn": 74.0, "em": 1.45, "custo": 0.35 },
  { "id": 30, "nome": "Palhada de milho", "categoria": "volumoso", "ms": 88, "pb": 4.0, "fdn": 78.0, "em": 1.25, "custo": 0.22 },
  { "id": 31, "nome": "Bagaço de cana in natura", "categoria": "volumoso", "ms": 50, "pb": 2.5, "fdn": 82.0, "em": 1.05, "custo": 0.18 },
  { "id": 32, "nome": "Bagaço de cana hidrolisado", "categoria": "volumoso", "ms": 55, "pb": 3.0, "fdn": 72.0, "em": 1.45, "custo": 0.28 },
  { "id": 33, "nome": "Cana-de-açúcar picada", "categoria": "volumoso", "ms": 30, "pb": 3.0, "fdn": 48.0, "em": 1.95, "custo": 0.25 },
  { "id": 34, "nome": "Casca de café", "categoria": "fibroso", "ms": 89, "pb": 10.0, "fdn": 58.0, "em": 1.65, "custo": 0.40 },
  { "id": 35, "nome": "Casca de amendoim", "categoria": "fibroso", "ms": 90, "pb": 8.0, "fdn": 70.0, "em": 1.30, "custo": 0.38 },
  { "id": 36, "nome": "Palha de arroz", "categoria": "fibroso", "ms": 89, "pb": 4.0, "fdn": 76.0, "em": 1.10, "custo": 0.20 },
  { "id": 37, "nome": "Capim elefante verde", "categoria": "volumoso", "ms": 22, "pb": 10.0, "fdn": 64.0, "em": 1.80, "custo": 0.27 },
  { "id": 38, "nome": "Silagem de capim", "categoria": "volumoso", "ms": 30, "pb": 8.0, "fdn": 60.0, "em": 1.75, "custo": 0.38 },
  { "id": 39, "nome": "Farelo de girassol", "categoria": "proteico", "ms": 90, "pb": 30.0, "fdn": 28.0, "em": 2.10, "custo": 1.65 },
  { "id": 40, "nome": "Farelo de canola", "categoria": "proteico", "ms": 90, "pb": 36.0, "fdn": 18.0, "em": 2.55, "custo": 1.85 },
  { "id": 41, "nome": "Levedura de cana seca", "categoria": "proteico", "ms": 93, "pb": 42.0, "fdn": 0.0, "em": 3.00, "custo": 2.80 },
  { "id": 42, "nome": "Polpa de citrus úmida", "categoria": "energético", "ms": 25, "pb": 2.0, "fdn": 6.0, "em": 0.75, "custo": 0.35 },
  { "id": 43, "nome": "Resíduo de cervejaria úmido", "categoria": "proteico energético", "ms": 22, "pb": 6.0, "fdn": 12.0, "em": 0.65, "custo": 0.45 },
  { "id": 44, "nome": "Gordura protegida", "categoria": "energético", "ms": 99, "pb": 0.0, "fdn": 0.0, "em": 7.50, "custo": 6.50 },
  { "id": 45, "nome": "Calcário calcítico", "categoria": "mineral", "ms": 99, "pb": 0.0, "fdn": 0.0, "em": 0.00, "custo": 0.40 },
  { "id": 46, "nome": "Fosfato bicálcico", "categoria": "mineral", "ms": 99, "pb": 0.0, "fdn": 0.0, "em": 0.00, "custo": 3.50 },
  { "id": 47, "nome": "Sal comum", "categoria": "mineral", "ms": 99, "pb": 0.0, "fdn": 0.0, "em": 0.00, "custo": 1.20 },
  { "id": 48, "nome": "Núcleo mineral", "categoria": "mineral", "ms": 98, "pb": 0.0, "fdn": 0.0, "em": 0.00, "custo": 4.80 },
  { "id": 49, "nome": "Ionóforo (Monensina)", "categoria": "aditivo", "ms": 95, "pb": 0.0, "fdn": 0.0, "em": 0.00, "custo": 85.00 },
  { "id": 50, "nome": "Virginiamicina", "categoria": "aditivo", "ms": 95, "pb": 0.0, "fdn": 0.0, "em": 0.00, "custo": 120.00 }
]

// Normaliza strings para busca insensível a acentos
const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

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
    normalize(ing.nome).includes(query) ||
    normalize(ing.categoria).includes(query)
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
    <UFormField label="Modo de Balanceamento" class="form-field">
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
    <div v-if="state.step3.balanceMode === 'manual'" class="manual-flow">
      <!-- Seção de Selecionados (Resumo) -->
      <div v-if="state.step3.selectedIngredients.length > 0" class="selected-section">
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
          <UCard v-for="ing in state.step3.selectedIngredients" :key="'selected-' + ing.id"
            class="ingredient-card selected"
            @click="toggleIngredient(ing)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="text-primary w-5 h-5" />
                <div class="flex flex-col">
                  <span class="font-bold text-slate-800">{{ ing.nome }}</span>
                  <span class="text-[10px] text-slate-400 uppercase font-semibold">
                    {{ ing.categoria }}
                  </span>
                </div>
              </div>
            </div>
          </UCard>
        </div>
        <USeparator class="mb-8" />
      </div>

      <UFormField label="Principais Ingredientes" :error="validationErrors.selectedIngredients" class="form-field">
        <!-- Estado de Carregamento -->
        <div v-if="pending" class="flex flex-col items-center justify-center py-10 gap-4">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-primary animate-spin" />
          <p class="text-sm text-slate-500 font-medium">Buscando ingredientes...</p>
        </div>

        <div v-else class="ingredients-flex">
          <UCard v-for="ing in availableIngredients" :key="ing.id"
            class="ingredient-card"
            :class="{ selected: isSelected(ing.id) }"
            :id="'ingredient-' + ing.id"
            @click="toggleIngredient(ing)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UCheckbox :model-value="isSelected(ing.id)" color="primary" readonly />
                <div class="flex flex-col">
                  <span class="font-bold text-slate-800">{{ ing.nome }}</span>
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[10px] text-slate-400 uppercase tracking-tight font-semibold">
                      PB: {{ ing.pb ?? 0 }}% | EM: {{ ing.em ?? 0 }} | R$ {{ (ing.custo ?? 0).toFixed(2) }}/kg
                    </span>
                  </div>
                </div>
              </div>
              <UIcon v-if="isSelected(ing.id)" name="i-heroicons-check-circle" class="text-primary w-5 h-5" />
            </div>
          </UCard>
        </div>

        <!-- Barra de Busca -->
        <div class="search-section">
          <UFormField label="Buscar outros ingredientes" class="form-field">
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
        <div v-if="searchQuery.length >= 2" class="search-results">
          <p class="results-info">Resultados para "{{ searchQuery }}":</p>

          <div v-if="searchResults.length > 0" class="ingredients-flex">
            <UCard v-for="ing in searchResults" :key="'search-' + ing.id"
              class="ingredient-card"
              :class="{ selected: isSelected(ing.id) }"
              @click="toggleIngredient(ing)"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <UCheckbox :model-value="isSelected(ing.id)" color="primary" readonly />
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-800">{{ ing.nome }}</span>
                    <div class="flex flex-col gap-0.5">
                      <span class="text-[10px] text-slate-400 uppercase tracking-tight font-semibold">
                        PB: {{ ing.pb ?? 0 }}% | EM: {{ ing.em ?? 0 }} | R$ {{ (ing.custo ?? 0).toFixed(2) }}/kg
                      </span>
                    </div>
                  </div>
                </div>
                <UIcon v-if="isSelected(ing.id)" name="i-heroicons-check-circle" class="text-primary w-5 h-5" />
              </div>
            </UCard>
          </div>

          <div v-else class="empty-results py-4">
            <p class="text-sm text-slate-400 italic">Nenhum outro ingrediente encontrado para esta busca.</p>
          </div>
        </div>

        <!-- Caso não existam ingredientes -->
        <div v-if="!pending && availableIngredients.length === 0" class="empty-state">
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
    <div v-if="state.step3.balanceMode === 'automatico'" class="auto-flow">
      <div class="info-box">
        <UIcon name="i-heroicons-light-bulb" class="w-6 h-6 text-primary" />
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
