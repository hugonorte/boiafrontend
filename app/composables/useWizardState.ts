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

// Estado global persistente (fora da função para ser compartilhado entre componentes)
const globalState = ref({
  currentStep: 0,
  step1: {
    animalRace: '',
    liveWeight: 0,
    cmsPercentage: 0,
    cmsCustomValue: null as number | null,
    isCustomCMS: false,
    totalCMS: 0
  },
  step2: {
    dietObjective: '',
    pb: 0,
    ndt: 0,
    fda: 0,
    fdn: 0
  },
  step3: {
    balanceMode: '',
    selectedIngredients: [] as Ingredient[],
    totalAmountKg: 0,
    dailyCost: 0
  },
  step4: {
    recommendations: [] as string[]
  }
})

export const useWizardState = () => {
  const state = globalState

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

  const logState = (action: string) => {
    console.log(`[WIZARD DEBUG] Ação: ${action}`, JSON.parse(JSON.stringify(state.value)))
  }

  return {
    state,
    nextStep,
    prevStep,
    logState
  }
}
