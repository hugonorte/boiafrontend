import { describe, it, expect, beforeEach } from 'vitest'
import { useWizardState } from '../../app/composables/useWizardState'

describe('useWizardState', () => {
  it('should initialize with default values', () => {
    const { state } = useWizardState()
    expect(state.value.currentStep).toBe(0)
    expect(state.value.step1.animalRace).toBe('')
    expect(state.value.step1.liveWeight).toBe(0)
  })

  it('should update current step', () => {
    const { nextStep, prevStep, state } = useWizardState()
    nextStep()
    expect(state.value.currentStep).toBe(1)
    prevStep()
    expect(state.value.currentStep).toBe(0)
  })
})
