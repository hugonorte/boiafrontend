import { ref } from 'vue'

export const useWizardState = () => {
  const state = ref({
    currentStep: 0,
    step1: {
      animalRace: '',
      liveWeight: 0,
      cmsPercentage: 2.0,
      cmsCustomValue: null as number | null
    },
    step2: {
      dietObjective: 'Mantença',
      pb: 10,
      ndt: 55,
      fdn: 50
    },
    step3: {
      balanceMode: 'Automático',
      selectedIngredients: [] as string[]
    }
  })

  const nextStep = () => {
    if (state.value.currentStep < 3) {
      state.value.currentStep++
    }
  }

  const prevStep = () => {
    if (state.value.currentStep > 0) {
      state.value.currentStep--
    }
  }

  return {
    state,
    nextStep,
    prevStep
  }
}
