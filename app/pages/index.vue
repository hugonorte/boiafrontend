<script setup lang="ts">
/**
 * BOIA APP - Main Layout
 * High-fidelity replication from Google Stitch Design
 * Aesthetic: Agro-Premium, Dark Background, Glassmorphism White Card.
 */

const { state, nextStep, prevStep } = useWizardState()

// Navigation items matching the Stitch design
const navigationTabs = [
  { label: 'CMS', description: 'Consumo', icon: 'i-heroicons-scale', step: 0 },
  { label: 'EXIGÊNCIAS', description: 'Metas', icon: 'i-heroicons-bolt', step: 1 },
  { label: 'FORMULAÇÃO', description: 'Ração', icon: 'i-heroicons-beaker', step: 2 },
  { label: 'RESULTADOS', description: 'Análise', icon: 'i-heroicons-chart-pie', step: 3 }
]

// Dynamic button labels for the primary action button
const actionButtonLabel = computed(() => {
  switch (state.value.currentStep) {
    case 0: return 'EXIGÊNCIAS NUTRICIONAIS'
    case 1: return 'INGREDIENTES DISPONÍVEIS'
    case 2: return 'GERAR RESULTADOS'
    case 3: return 'SALVAR DIETA'
    default: return 'PRÓXIMO'
  }
})

const handleNext = () => {
  if (state.value.currentStep < 3) {
    nextStep()
  } else {
    // Save logic
    console.log('Salvando dieta calculada...')
  }
}

const goToStep = (step: number) => {
  state.value.currentStep = step
}
</script>

<template>
  <div class="boia-agro-container">
    <!-- 1. Header Area -->
    <header class="app-header">
      <div class="header-content">
        <div class="logo-wrapper">
          <UIcon name="i-heroicons-leaf" class="logo-icon" />
          <div class="logo-text-group">
            <span class="logo-main">BOIA APP</span>
            <span class="logo-sub">Agro Intelligence</span>
          </div>
        </div>
        <div class="header-actions">
          <UButton color="white" variant="ghost" icon="i-heroicons-bell" size="lg" />
          <UAvatar src="https://avatars.githubusercontent.com/u/1?v=4" alt="User" size="sm" />
        </div>
      </div>
    </header>

    <!-- 2. Top Stepper Navigation -->
    <nav class="app-navigation">
      <div class="stepper-indicator">
        <div 
          v-for="(item, index) in navigationTabs" 
          :key="index"
          class="step-item"
          :class="{ active: state.currentStep === index, completed: state.currentStep > index }"
          @click="goToStep(index)"
        >
          <div class="step-circle">
            <span v-if="state.currentStep <= index">{{ index + 1 }}</span>
            <UIcon v-else name="i-heroicons-check" />
          </div>
          <span class="step-label">{{ item.label }}</span>
        </div>
      </div>
    </nav>

    <!-- 3. Main Stage -->
    <main class="main-stage">
      <div class="content-card">
        <Transition name="slide-up" mode="out-in">
          <div :key="state.currentStep" class="step-view-container">
            <WizardStep1CMS v-if="state.currentStep === 0" />
            <WizardStep2Requirements v-else-if="state.currentStep === 1" />
            <WizardStep3Ingredients v-else-if="state.currentStep === 2" />
            <WizardStep4Results v-else-if="state.currentStep === 3" />
          </div>
        </Transition>

        <!-- 4. Footer Action -->
        <div class="card-footer-action">
          <UButton 
            v-if="state.currentStep > 0"
            color="gray" 
            variant="ghost" 
            icon="i-heroicons-arrow-left"
            class="btn-back"
            @click="prevStep"
          />
          
          <UButton 
            :color="state.currentStep === 3 ? 'green' : 'primary'" 
            size="xl" 
            block
            class="btn-primary-action"
            :trailing-icon="state.currentStep === 3 ? 'i-heroicons-cloud-arrow-up' : 'i-heroicons-arrow-right'"
            @click="handleNext"
          >
            {{ actionButtonLabel }}
          </UButton>
        </div>
      </div>

      <!-- Reference Info Badge -->
      <div class="ref-badge-wrapper">
        <div class="ref-badge">
          <UIcon name="i-heroicons-shield-check" />
          <span>Sincronizado com Banco de Dados Nutricional 2024</span>
        </div>
      </div>
    </main>

    <!-- 5. Bottom Navigation Bar -->
    <footer class="bottom-tab-bar">
      <div class="nav-icons">
        <div 
          v-for="(tab, index) in navigationTabs" 
          :key="index"
          class="nav-icon-item"
          :class="{ active: state.currentStep === index }"
          @click="goToStep(index)"
        >
          <UIcon :name="tab.icon" />
          <span>{{ tab.description }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
/**
 * STITCH HIGH-FIDELITY REPLICATION
 */

.boia-agro-container {
  min-height: 100vh;
  background-color: #0f172a; // Deep slate
  display: flex;
  flex-direction: column;
  padding-bottom: 90px;
  font-family: 'Inter', sans-serif;

  .app-header {
    background-color: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
    }
    
    .logo-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      .logo-icon {
        color: #22c55e;
        font-size: 2.25rem;
        filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.3));
      }
      
      .logo-text-group {
        display: flex;
        flex-direction: column;
        line-height: 1;
        
        .logo-main {
          font-weight: 900;
          font-size: 1.15rem;
          color: white;
          letter-spacing: -0.01em;
        }
        .logo-sub {
          font-size: 0.65rem;
          color: #94a3b8;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-top: 0.15rem;
        }
      }
    }
  }

  .app-navigation {
    padding: 1.5rem 1rem 2rem;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    
    .stepper-indicator {
      display: flex;
      justify-content: space-between;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 18px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #334155;
        z-index: 0;
      }
      
      .step-item {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        
        .step-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #1e293b;
          border: 2px solid #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-weight: 800;
          font-size: 0.85rem;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .step-label {
          font-size: 0.6rem;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.05em;
        }
        
        &.active {
          .step-circle {
            background-color: #22c55e;
            border-color: #22c55e;
            color: white;
            transform: scale(1.15);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
          }
          .step-label { color: #22c55e; }
        }
        
        &.completed {
          .step-circle {
            background-color: #22c55e;
            border-color: #22c55e;
            color: white;
          }
          .step-label { color: #94a3b8; }
        }
      }
    }
  }

  .main-stage {
    flex: 1;
    padding: 0 1rem;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    
    .content-card {
      background-color: white;
      border-radius: 32px;
      padding: 2.5rem;
      min-height: 600px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      
      .step-view-container {
        flex: 1;
      }
    }

    .card-footer-action {
      margin-top: 3rem;
      display: flex;
      gap: 1rem;
      
      .btn-primary-action {
        flex: 1;
        height: 64px;
        font-weight: 900;
        font-size: 1.1rem;
        border-radius: 20px;
        letter-spacing: 0.02em;
        box-shadow: 0 10px 20px -5px rgba(22, 163, 74, 0.4);
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 25px -5px rgba(22, 163, 74, 0.5);
        }
      }
      
      .btn-back {
        width: 64px;
        height: 64px;
        border-radius: 20px;
        background-color: #f1f5f9;
        color: #64748b;
      }
    }

    .ref-badge-wrapper {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      
      .ref-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 1rem;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        color: #64748b;
        font-size: 0.75rem;
        font-weight: 600;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }

  .bottom-tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(15px);
    border-top: 1px solid #1e293b;
    padding: 0.85rem 1.5rem;
    z-index: 100;
    
    .nav-icons {
      display: flex;
      justify-content: space-around;
      max-width: 600px;
      margin: 0 auto;
      
      .nav-icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        color: #64748b;
        cursor: pointer;
        transition: all 0.2s ease;
        
        span {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .icon {
          font-size: 1.6rem;
        }
        
        &.active {
          color: #22c55e;
          transform: translateY(-2px);
        }
      }
    }
  }
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
