<script setup lang="ts">
const { state } = useWizardState()
const { calculateCMS } = useCalculations()

const objectives = [
  { label: 'Mantença', value: 'Mantença' },
  { label: 'Ganho moderado', value: 'Ganho moderado' },
  { label: 'Ganho intensivo', value: 'Ganho intensivo' },
  { label: 'Personalizado', value: 'Personalizado' }
]

const objectiveValues: Record<string, { pb: number, ndt: number, fdn: number }> = {
  'Mantença': { pb: 10, ndt: 55, fdn: 50 },
  'Ganho moderado': { pb: 12, ndt: 60, fdn: 55 },
  'Ganho intensivo': { pb: 14, ndt: 65, fdn: 60 }
}

const tableData = computed(() => [
  { objective: 'Mantença', pb: '10%', ndt: '55%', fdn: '50%' },
  { objective: 'Moderado', pb: '12%', ndt: '60%', fdn: '55%' },
  { objective: 'Intensivo', pb: '14%', ndt: '65%', fdn: '60%' }
])

const columns = [
  { key: 'objective', label: 'Objetivo' },
  { key: 'pb', label: 'PB' },
  { key: 'ndt', label: 'NDT' },
  { key: 'fdn', label: 'FDN' }
]

// Update values when objective changes
watch(() => state.value.step2.dietObjective, (newVal) => {
  if (newVal !== 'Personalizado') {
    const vals = objectiveValues[newVal]
    if (vals) {
      state.value.step2.pb = vals.pb
      state.value.step2.ndt = vals.ndt
      state.value.step2.fdn = vals.fdn
    }
  }
})
</script>

<template>
  <div class="step-content space-y-6">
    <UCard class="premium-card">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900">Exigências Nutricionais</h2>
          <p class="text-gray-500">Defina os níveis de proteína e energia da dieta</p>
        </div>
      </template>

      <div class="space-y-6">
        <UAlert
          color="blue"
          variant="subtle"
          title="Resumo do Animal"
          icon="i-heroicons-information-circle"
          :description="`Peso: ${state.step1.liveWeight} kg | CMS Estimado: ${calculateCMS(state.step1.liveWeight, state.step1.cmsPercentage || state.step1.cmsCustomValue || 0).toFixed(2)} kg/dia`"
        />

        <UFormField label="Objetivo da Dieta" name="objective">
          <URadioGroup v-model="state.step2.dietObjective" :options="objectives" />
        </UFormField>

        <div v-if="state.step2.dietObjective !== 'Personalizado'" class="mt-4">
          <UTable :columns="columns" :rows="tableData" class="border rounded-lg overflow-hidden" />
          <p class="text-xs text-gray-400 mt-2">* Valores baseados na tabela NRC para a raça selecionada.</p>
        </div>

        <div v-if="state.step2.dietObjective === 'Personalizado'" class="grid grid-cols-3 gap-4 mt-4">
          <UFormField label="PB (%)" name="pb">
            <UInput v-model="state.step2.pb" type="number" />
          </UFormField>
          <UFormField label="NDT (%)" name="ndt">
            <UInput v-model="state.step2.ndt" type="number" />
          </UFormField>
          <UFormField label="FDN (%)" name="fdn">
            <UInput v-model="state.step2.fdn" type="number" />
          </UFormField>
        </div>

        <div class="p-4 bg-green-50 rounded-lg border border-green-100">
          <h4 class="font-semibold text-green-800 mb-2">Níveis Selecionados:</h4>
          <div class="flex justify-around text-center">
            <div>
              <p class="text-xs text-green-600 uppercase">Proteína (PB)</p>
              <p class="text-xl font-bold text-green-900">{{ state.step2.pb }}%</p>
            </div>
            <div>
              <p class="text-xs text-green-600 uppercase">Energia (NDT)</p>
              <p class="text-xl font-bold text-green-900">{{ state.step2.ndt }}%</p>
            </div>
            <div>
              <p class="text-xs text-green-600 uppercase">Fibra (FDN)</p>
              <p class="text-xl font-bold text-green-900">{{ state.step2.fdn }}%</p>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
