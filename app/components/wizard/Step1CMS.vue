<script setup lang="ts">
const { state } = useWizardState()
const { calculateCMS, getCMSStatus } = useCalculations()

const races = [
  'Nelore', 'Angus', 'Braford', 'Charolês', 'Simental',
  'Guzerá', 'Tabapuã', 'Canchim', 'Pantaneiro', 'Crioulo', 'Outra'
]

const cmsOptions = [
  { label: 'Baixo consumo (1.8%)', value: 1.8 },
  { label: 'Médio (2.2%)', value: 2.2 },
  { label: 'Alto (2.5%)', value: 2.5 },
  { label: 'Personalizado', value: 0 }
]

const cmsResult = computed(() => {
  const percentage = state.value.step1.cmsPercentage === 0
    ? (state.value.step1.cmsCustomValue || 0)
    : state.value.step1.cmsPercentage
  return calculateCMS(state.value.step1.liveWeight, percentage)
})

const cmsStatus = computed(() => {
  const percentage = state.value.step1.cmsPercentage === 0
    ? (state.value.step1.cmsCustomValue || 0)
    : state.value.step1.cmsPercentage
  return getCMSStatus(percentage)
})
</script>

<template>
  <div class="step-content space-y-6">
    <UCard class="premium-card">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900">Consumo de Matéria Seca (CMS)</h2>
          <p class="text-gray-500">Informe os dados do animal para estimar o consumo diário</p>
        </div>
      </template>

      <div class="space-y-4">
        <UFormField label="Raça do Animal" name="race">
          <USelect v-model="state.step1.animalRace" :options="races" placeholder="Selecione a raça" />
        </UFormField>

        <UFormField label="Peso vivo (kg)" name="weight" help="Peso atual do animal">
          <UInput v-model="state.step1.liveWeight" type="number" placeholder="Ex: 450" />
        </UFormField>

        <UFormField label="% do Peso Vivo (CMS)" name="cms">
          <URadioGroup v-model="state.step1.cmsPercentage" :options="cmsOptions" />

          <div v-if="state.step1.cmsPercentage === 0" class="mt-2">
            <UInput
              v-model="state.step1.cmsCustomValue"
              type="number"
              step="0.1"
              placeholder="Informe o valor (1% a 3%)"
              help="Valor típico: 2% a 2,5%"
            />
          </div>
        </UFormField>
      </div>

      <template #footer>
        <div v-if="state.step1.liveWeight > 0" class="mt-4 p-4 bg-gray-50 rounded-lg text-center">
          <p class="text-lg font-semibold">Consumo estimado: CMS = {{ cmsResult.toFixed(2) }} kg/dia</p>
          <UBadge :color="cmsStatus.color" variant="solid" class="mt-2">
            {{ cmsStatus.label }}
          </UBadge>
        </div>

        <UCard class="mt-4 bg-blue-50 border-blue-100">
          <p class="text-sm text-blue-700">
            O consumo de matéria seca representa a quantidade de alimento que o animal ingere diariamente, desconsiderando a água.
          </p>
        </UCard>
      </template>
    </UCard>
  </div>
</template>

<style lang="scss">
.premium-card {
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);

  .text-gray-900 {
    color: #1e293b;
  }
}

.step-content {
  max-width: 600px;
  margin: 0 auto;
}
</style>
