import { ref } from 'vue'

export interface Ingredient {
  id: string
  name: string
  pb: number
  ndt: number
  fda: number
  costPerKg: number
  amountKg?: number
}

export const useWizardState = () => {
  const state = ref({
    currentStep: 0,
    step1: {
      animalRace: '',
      liveWeight: 450,
      cmsPercentage: 2.2,
      cmsCustomValue: null as number | null,
      isCustomCMS: false
    },
    step2: {
      dietObjective: 'Manutenção',
      pb: 12,
      ndt: 65,
      fda: 25,
      fdn: 45
    },
    step3: {
      balanceMode: 'Automático',
      selectedIngredients: [] as Ingredient[],
      totalAmountKg: 0,
      dailyCost: 0
    },
    step4: {
      recommendations: [] as string[]
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
