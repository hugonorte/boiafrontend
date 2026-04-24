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
    dietObjective: '',
    cmsPercentage: 0,
    cmsCustomValue: null as number | null,
    isCustomCMS: false,
    totalCMS: 0,
    pesoMetabolico: 0,
    EnergiaLiquidaMantenca: 0,
    sex: '',
    age: 0,
    pregnancyDays: undefined as number | undefined,
    milkProduction: undefined as number | undefined
  },
  step2: {
    productionSystem: '',
    activityLevel: '',
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
