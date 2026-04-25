import { ref } from 'vue'

export interface Ingredient {
  id: number
  nome: string
  categoria: string
  ms: number
  pb: number
  fdn: number
  em: number
  eb: number
  custo: number
  amountKg?: number
}

// Estado global persistente
const globalState = ref({
  currentStep: 0,
  step1: {
    animalRace: '',
    liveWeight: 0,
    dietObjective: '',
    cmsPercentage: 0,
    cmsCustomValue: null as number | null,
    isCustomCMS: false,
    initialCMSEstimate: 0,
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
    energiaBrutaMedia: 0,
    EMdieta: 0,
    EBDieta: 0,
    Q: 0,
    Km: 0,
    EMm: 0,
    cmsReal: 0,
    recommendations: [] as string[]
  }
})

// Erros de validação globais para que layout e páginas compartilhem o mesmo estado
const globalValidationErrors = ref<Record<string, any>>({})

export const useWizardState = () => {
  const state = globalState
  const validationErrors = globalValidationErrors

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

  const validateStep = (stepNumber: number) => {
    validationErrors.value = {}
    if (stepNumber === 1) {
      if (!state.value.step1.animalRace) validationErrors.value.animalRace = "Obrigatório"
      if (!state.value.step1.sex) validationErrors.value.sex = "Obrigatório"
      if (!state.value.step1.age) validationErrors.value.age = "Obrigatório"
      if (!state.value.step1.liveWeight || state.value.step1.liveWeight <= 0) validationErrors.value.liveWeight = "Obrigatório"
      if (!state.value.step1.dietObjective) validationErrors.value.dietObjective = "Obrigatório"
    } else if (stepNumber === 2) {
      if (!state.value.step2.productionSystem) validationErrors.value.productionSystem = "Obrigatório"
      if (!state.value.step2.activityLevel) validationErrors.value.activityLevel = "Obrigatório"
    } else if (stepNumber === 3) {
      if (!state.value.step3.selectedIngredients || state.value.step3.selectedIngredients.length === 0) {
        validationErrors.value.selectedIngredients = "Selecione pelo menos um ingrediente"
      } else if (state.value.step1.dietObjective === 'Mantença') {
        // Validação específica para Mantença: Necessário Volumoso, Energético e Proteico
        const selectedCats = state.value.step3.selectedIngredients.map(i => i.categoria.toLowerCase())
        const hasVolumoso = selectedCats.some(cat => cat.includes('volumoso'))
        const hasEnergetico = selectedCats.some(cat => cat.includes('energético'))
        const hasProteico = selectedCats.some(cat => cat.includes('proteico'))

        if (!hasVolumoso || !hasEnergetico || !hasProteico) {
          let missing = []
          if (!hasVolumoso) missing.push('Volumoso')
          if (!hasEnergetico) missing.push('Energético')
          if (!hasProteico) missing.push('Proteico')
          validationErrors.value.selectedIngredients = `Para o objetivo Mantença, selecione pelo menos um ingrediente de cada categoria: ${missing.join(', ')}`
        }
      }
    }
    return Object.keys(validationErrors.value).length === 0
  }

  return {
    state,
    validationErrors,
    validateStep,
    nextStep,
    prevStep,
    logState
  }
}
