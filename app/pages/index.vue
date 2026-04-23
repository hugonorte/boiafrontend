<script setup lang="ts">
const { state, nextStep, prevStep } = useWizardState()

const steps = [
  { label: 'CMS', description: 'Consumo Matéria Seca', icon: 'i-heroicons-beaker' },
  { label: 'Exigências', description: 'Metas Nutricionais', icon: 'i-heroicons-bolt' },
  { label: 'Ingredientes', description: 'Seleção de Itens', icon: 'i-heroicons-list-bullet' },
  { label: 'Resultados', description: 'Análise Final', icon: 'i-heroicons-check-circle' }
]
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-12">
      <h1 class="text-5xl font-black text-center text-gray-900 mb-4 tracking-tight">
        BOIA<span class="text-primary-600">APP</span>
      </h1>
      <p class="text-center text-gray-500 text-lg">Inteligência em Formulação de Ração Bovina</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar Stepper -->
      <div class="lg:col-span-1">
        <div class="premium-card sticky top-8">
          <UStepper 
            v-model="state.currentStep" 
            :items="steps" 
            orientation="vertical" 
            size="xl"
            class="space-y-6"
          />
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="lg:col-span-3">
        <div class="premium-card min-h-[600px] flex flex-col justify-between">
          <div class="step-content">
            <div v-if="state.currentStep === 0">
              <WizardStep1CMS />
            </div>
            <div v-else-if="state.currentStep === 1">
              <WizardStep2Requirements />
            </div>
            <div v-else-if="state.currentStep === 2">
              <WizardStep3Ingredients />
            </div>
            <div v-else-if="state.currentStep === 3">
              <WizardStep4Results />
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between items-center pt-8 mt-12 border-t border-gray-100">
            <UButton 
              v-if="state.currentStep > 0" 
              color="gray" 
              variant="subtle" 
              size="lg"
              icon="i-heroicons-arrow-left" 
              @click="prevStep"
            >
              Anterior
            </UButton>
            <div v-else />

            <div class="flex gap-4">
              <UButton 
                v-if="state.currentStep < 3" 
                color="primary" 
                size="lg"
                trailing-icon="i-heroicons-arrow-right" 
                @click="nextStep"
              >
                Próximo Passo
              </UButton>
              <UButton 
                v-else 
                color="green" 
                size="lg"
                icon="i-heroicons-check-badge"
              >
                Concluir Formulação
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<style lang="scss">
.premium-card {
  // Overriding padding for better spacing in grid
  padding: 1.5rem;
}
</style>
