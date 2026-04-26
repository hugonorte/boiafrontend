<script setup lang="ts">
import CmsSelector from '~/components/wizard/CmsSelector.vue'

definePageMeta({
  layout: 'wizard'
})

const { state, validationErrors } = useWizardState()

const racas = [
  'Nelore', 'Angus', 'Braford', 'Charolês', 'Simental', 'Guzerá', 'Tabapuã', 'Canchim', 'Pantaneiro', 'Crioulo', 'Outra'
]

const dietObjectives = [
  { label: 'Mantença', value: 'mantença', icon: 'i-heroicons-sun', description: 'Equação base para animais em estado de repouso.' },
  { label: 'Ganho de Peso', value: 'ganho', icon: 'i-heroicons-arrow-trending-up', description: 'Para animais em fase de engorda ou crescimento.' },
  { label: 'Gestação', value: 'gestação', icon: 'i-heroicons-user-group', description: 'Ajuste baseado nos dias de gestação.' },
  { label: 'Lactação', value: 'lactação', icon: 'i-heroicons-beaker', description: 'Baseado na produção diária e gordura do leite.' }
]

// Usando inputs simples para garantir compatibilidade total com Cypress
const handleWeightInput = (val: string | number) => {
  const num = Number(val)
  state.value.step1.liveWeight = num
  if (num > 0) {
    state.value.step1.pesoMetabolico = Math.pow(num, 0.75)
    state.value.step1.EnergiaLiquidaMantenca = state.value.step1.pesoMetabolico * 0.077
  }
}
</script>

<template>
  <div class="container flex flex-col gap-6 p-4">
    <UFormField label="Raça do animal" :error="validationErrors.animalRace">
      <select v-model="state.step1.animalRace" id="input-race" class="w-full p-2 border rounded bg-white text-slate-900 border-slate-300">
        <option value="">Selecione a raça</option>
        <option v-for="r in racas" :key="r" :value="r">{{ r }}</option>
      </select>
    </UFormField>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UFormField label="Sexo" :error="validationErrors.sex">
        <select v-model="state.step1.sex" id="input-sex" class="w-full p-2 border rounded bg-white text-slate-900 border-slate-300">
          <option value="">Selecione</option>
          <option value="macho">Macho</option>
          <option value="fêmea">Fêmea</option>
        </select>
      </UFormField>

      <UFormField label="Idade (meses)" :error="validationErrors.age">
        <UInput v-model.number="state.step1.age" type="number" placeholder="Ex: 24" id="input-age" class="w-full" />
      </UFormField>

      <UFormField label="Peso vivo (kg)" :error="validationErrors.liveWeight">
        <UInput type="number" :model-value="state.step1.liveWeight" @update:model-value="handleWeightInput" placeholder="Ex: 450" id="input-weight" class="w-full" />
      </UFormField>
    </div>

    <UFormField label="Objetivo da Dieta" :error="validationErrors.dietObjective">
      <div class="objective-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="obj in dietObjectives" :key="obj.value"
             :class="['p-4 border-2 rounded-xl cursor-pointer transition-all', state.step1.dietObjective === obj.value ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300 bg-white']"
             @click="state.step1.dietObjective = obj.value"
             :id="`objective-${obj.value}`">
          <div class="flex items-center gap-3">
            <UIcon :name="obj.icon" class="text-2xl text-primary-600" />
            <div>
              <p class="font-bold text-slate-900">{{ obj.label }}</p>
              <p class="text-xs text-slate-500">{{ obj.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </UFormField>
    <CmsSelector :pesoVivo="Number(state.step1.liveWeight)"/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 1rem 0;
}
</style>
