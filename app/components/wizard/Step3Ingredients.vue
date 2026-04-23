<script setup lang="ts">
const { state } = useWizardState()

const modes = ['Manual (técnico)', 'Automático (iniciante)']
const autoOptions = ['Quero escolher os ingredientes', 'Escolha os ingredientes por mim']

const availableIngredients = [
  { name: 'Milho', pb: 8, ndt: 85, fdn: 10, fda: 2, ms: 88, cost: 1.0 },
  { name: 'Farelo de soja', pb: 45, ndt: 75, fdn: 15, fda: 5, ms: 90, cost: 2.0 },
  { name: 'Silagem', pb: 8, ndt: 60, fdn: 50, fda: 30, ms: 35, cost: 0.5 },
  { name: 'Capim', pb: 10, ndt: 55, fdn: 60, fda: 35, ms: 25, cost: 0.3 },
  { name: 'Núcleo mineral', pb: 0, ndt: 0, fdn: 0, fda: 0, ms: 100, cost: 5.0 }
]

const selectedIngredientsData = computed(() => {
  return availableIngredients.filter(i => state.value.step3.selectedIngredients.includes(i.name))
})

const columns = [
  { key: 'name', label: 'Ingrediente' },
  { key: 'pb', label: 'PB (%)' },
  { key: 'ndt', label: 'NDT (%)' },
  { key: 'fdn', label: 'FDN (%)' },
  { key: 'cost', label: 'Custo (R$/kg)' }
]

const alerts = computed(() => {
  const list = []
  // Simple mock alerts for demonstration
  if (state.value.step3.selectedIngredients.length > 0 && !state.value.step3.selectedIngredients.includes('Farelo de soja')) {
    list.push({ message: 'Proteína insuficiente', color: 'red' })
  }
  if (state.value.step3.selectedIngredients.includes('Milho') && state.value.step3.selectedIngredients.length < 3) {
    list.push({ message: 'Excesso de concentrado', color: 'yellow' })
  }
  return list
})
</script>

<template>
  <div class="step-content space-y-6">
    <UCard class="premium-card">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900">Ingredientes e Formulação</h2>
          <p class="text-gray-500">Selecione os ingredientes e monte a ração</p>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Summary Card -->
        <UCard class="bg-gray-50 border-gray-100">
          <div class="grid grid-cols-2 gap-2 text-sm">
            <p><span class="font-semibold">Animal:</span> {{ state.step1.animalRace }} ({{ state.step1.liveWeight }}kg)</p>
            <p><span class="font-semibold">Objetivo:</span> {{ state.step2.dietObjective }}</p>
            <p><span class="font-semibold">PB Necessária:</span> {{ state.step2.pb }}%</p>
            <p><span class="font-semibold">Energia:</span> {{ state.step2.ndt }}% NDT</p>
          </div>
        </UCard>

        <UFormField label="Modo de Balanceamento" name="mode">
          <URadioGroup v-model="state.step3.balanceMode" :options="modes" />
        </UFormField>

        <div v-if="state.step3.balanceMode === 'Automático (iniciante)'" class="space-y-4">
          <URadioGroup v-model="state.step3.autoChoice" :options="autoOptions" />
        </div>

        <div v-if="state.step3.balanceMode === 'Manual (técnico)' || state.step3.autoChoice === 'Quero escolher os ingredientes'" class="space-y-4">
          <h3 class="font-semibold">Selecione os Ingredientes:</h3>
          <div class="grid grid-cols-2 gap-2">
            <UCheckbox 
              v-for="ing in availableIngredients" 
              :key="ing.name" 
              v-model="state.step3.selectedIngredients" 
              :label="ing.name" 
              :value="ing.name"
            />
          </div>
        </div>

        <div v-if="state.step3.selectedIngredients.length > 0" class="mt-6">
          <h3 class="font-semibold mb-2">Composição da Dieta:</h3>
          <UTable :columns="columns" :rows="selectedIngredientsData" class="border rounded-lg" />
          
          <div class="flex flex-wrap gap-2 mt-4">
            <UAlert
              v-for="(alert, idx) in alerts"
              :key="idx"
              :color="alert.color"
              variant="solid"
              :title="alert.message"
              class="w-auto"
            />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
