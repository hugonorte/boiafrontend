<script setup lang="ts">
/**
 * Step 3: Formulação / Ingredientes
 * High-fidelity replication from Stitch Design
 */

import type { Ingredient } from '~/composables/useWizardState'

const { state } = useWizardState()

const availableIngredients: Ingredient[] = [
  { id: '1', name: 'Milho Grão', pb: 8.5, ndt: 88, fda: 3, costPerKg: 1.2 },
  { id: '2', name: 'Farelo de Soja', pb: 46, ndt: 81, fda: 7, costPerKg: 2.5 },
  { id: '3', name: 'Silagem de Milho', pb: 7.5, ndt: 68, fda: 28, costPerKg: 0.35 },
  { id: '4', name: 'Farelo de Algodão', pb: 28, ndt: 74, fda: 18, costPerKg: 1.8 },
  { id: '5', name: 'Ureia Pecuária', pb: 281, ndt: 0, fda: 0, costPerKg: 4.5 }
]

const toggleIngredient = (ing: Ingredient) => {
  const index = state.value.step3.selectedIngredients.findIndex(i => i.id === ing.id)
  if (index > -1) {
    state.value.step3.selectedIngredients.splice(index, 1)
  } else {
    state.value.step3.selectedIngredients.push({ ...ing, amountKg: 0 })
  }
}

const isSelected = (id: string) => {
  return state.value.step3.selectedIngredients.some(i => i.id === id)
}

const totalCost = computed(() => {
  return state.value.step3.selectedIngredients.reduce((acc, ing) => {
    return acc + (ing.costPerKg * (ing.amountKg || 0))
  }, 0)
})

const pbBalance = computed(() => {
  // Mock logic for balance visualization
  return 85 // % of target
})
</script>

<template>
  <div class="step-ingredients-fidelity">
    <!-- Header with Cost Highlight -->
    <header class="step-header mb-8 flex justify-between items-end">
      <div>
        <h2 class="title">Formulação da Ração</h2>
        <p class="subtitle">Selecione e ajuste as quantidades dos ingredientes.</p>
      </div>
      <div class="cost-highlight">
        <span class="label">CUSTO ESTIMADO</span>
        <span class="value">R$ {{ totalCost.toFixed(2) }}<small>/dia</small></span>
      </div>
    </header>

    <div class="form-container space-y-8">
      <!-- 1. Balance Mode Toggle -->
      <div class="mode-toggle-card">
        <div class="toggle-group">
          <button 
            class="toggle-btn" 
            :class="{ active: state.step3.balanceMode === 'Automático' }"
            @click="state.step3.balanceMode = 'Automático'"
          >
            <UIcon name="i-heroicons-cpu-chip" />
            AUTOMÁTICO
          </button>
          <button 
            class="toggle-btn" 
            :class="{ active: state.step3.balanceMode === 'Manual' }"
            @click="state.step3.balanceMode = 'Manual'"
          >
            <UIcon name="i-heroicons-adjustments-horizontal" />
            MANUAL
          </button>
        </div>
        <p class="mode-hint">
          {{ state.step3.balanceMode === 'Automático' ? 'O sistema calculará as proporções ótimas para você.' : 'Ajuste manualmente cada ingrediente.' }}
        </p>
      </div>

      <!-- 2. Ingredient List -->
      <section class="form-group">
        <label class="group-label">Ingredientes Disponíveis</label>
        <div class="ingredient-list space-y-3">
          <div 
            v-for="ing in availableIngredients" 
            :key="ing.id"
            class="ingredient-item"
            :class="{ selected: isSelected(ing.id) }"
          >
            <UCheckbox 
              :model-value="isSelected(ing.id)" 
              @update:model-value="toggleIngredient(ing)"
            />
            <div class="ing-info">
              <span class="ing-name">{{ ing.name }}</span>
              <div class="ing-metrics">
                <span>PB: {{ ing.pb }}%</span>
                <span>NDT: {{ ing.ndt }}%</span>
                <span>R$/kg: {{ ing.costPerKg.toFixed(2) }}</span>
              </div>
            </div>
            <div v-if="isSelected(ing.id) && state.step3.balanceMode === 'Manual'" class="ing-amount">
              <UInput 
                v-model="state.step3.selectedIngredients.find(i => i.id === ing.id)!.amountKg" 
                type="number" 
                size="sm" 
                trailing-icon="i-heroicons-scale"
                class="w-24"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Formulation Progress / Balance -->
      <section class="balance-summary mt-8">
        <div class="summary-card">
          <header class="card-header">
            <span class="label">BALANÇO NUTRICIONAL</span>
            <UBadge :color="pbBalance > 90 ? 'green' : 'amber'" variant="subtle">
              {{ pbBalance > 90 ? 'EQUILIBRADO' : 'AJUSTANDO' }}
            </UBadge>
          </header>
          <div class="balance-bars space-y-4 mt-4">
            <div class="bar-item">
              <div class="bar-info"><span>Proteína Bruta (PB)</span><span>{{ pbBalance }}%</span></div>
              <UMeter :value="pbBalance" color="primary" />
            </div>
            <div class="bar-item">
              <div class="bar-info"><span>Energia (NDT)</span><span>92%</span></div>
              <UMeter :value="92" color="blue" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.step-ingredients-fidelity {
  .cost-highlight {
    text-align: right;
    background-color: #f8fafc;
    padding: 0.75rem 1.25rem;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    
    .label {
      display: block;
      font-size: 0.65rem;
      font-weight: 800;
      color: #94a3b8;
      letter-spacing: 0.05em;
    }
    .value {
      font-size: 1.25rem;
      font-weight: 900;
      color: #16a34a;
      
      small { font-size: 0.8rem; color: #64748b; }
    }
  }

  .mode-toggle-card {
    background-color: #f1f5f9;
    padding: 1rem;
    border-radius: 16px;
    
    .toggle-group {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      
      .toggle-btn {
        flex: 1;
        padding: 0.6rem;
        border-radius: 10px;
        border: none;
        font-size: 0.75rem;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: #e2e8f0;
        color: #64748b;
        transition: all 0.2s ease;
        
        &.active {
          background-color: #1e293b;
          color: white;
        }
      }
    }
    
    .mode-hint {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 500;
    }
  }

  .ingredient-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: white;
    border: 1px solid #f1f5f9;
    border-radius: 16px;
    transition: all 0.2s ease;
    
    &:hover { border-color: #e2e8f0; }
    &.selected { border-color: #22c55e; background-color: rgba(34, 197, 94, 0.02); }
    
    .ing-info {
      flex: 1;
      
      .ing-name {
        display: block;
        font-weight: 800;
        font-size: 0.9rem;
        color: #1e293b;
      }
      
      .ing-metrics {
        display: flex;
        gap: 1rem;
        font-size: 0.7rem;
        font-weight: 600;
        color: #94a3b8;
        margin-top: 0.25rem;
      }
    }
  }

  .summary-card {
    border-top: 1px dashed #e2e8f0;
    padding-top: 2rem;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .label {
        font-size: 0.7rem;
        font-weight: 800;
        color: #64748b;
        letter-spacing: 0.05em;
      }
    }
    
    .bar-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      font-weight: 700;
      color: #334155;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
