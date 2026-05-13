<script setup lang="ts">
const { state, validationErrors } = useWizardState()

const systems = [
  {
    label: 'Pasto Contínuo',
    value: 'pasto_extensivo',
    icon: 'i-heroicons-sun',
    description: 'Extensivo'
  },
  {
    label: 'Pasto rotacionado',
    value: 'pasto_rotacionado',
    icon: 'i-heroicons-arrow-path',
    description: 'Extensivo'
  },
  {
    label: 'Semi-confinamento',
    value: 'semi_confinamento',
    icon: 'i-heroicons-home',
    description: 'Semi-intensivo'
  },
  {
    label: 'Confinamento',
    value: 'confinamento',
    icon: 'i-heroicons-building-office-2',
    description: 'Intensivo'
  }
]

const activityLevels = [
  {
    label: 'Baixo',
    value: 'baixo',
    icon: 'i-heroicons-bolt-slash',
    description: 'Animais confinados or com deslocamento mínimo.'
  },
  {
    label: 'Médio',
    value: 'médio',
    icon: 'i-heroicons-bolt',
    description: 'Animais em pastagens planas com deslocamento moderado.'
  },
  {
    label: 'Alto',
    value: 'alto',
    icon: 'i-heroicons-fire',
    description: 'Animais em terrenos acidentados ou grandes distâncias.'
  }
]
</script>

<template>
  <div class="systems-activity-wrapper">
    <UFormField label="Sistema de Produção" :error="validationErrors.productionSystem">
      <div class="selection-grid">
        <div
          v-for="sys in systems" :key="sys.value"
          :class="['selection-card', state.step2.productionSystem === sys.value ? 'active' : '']"
          :id="`production-system-${sys.value}`"
          @click="state.step2.productionSystem = sys.value"
        >
          <div class="card-content">
            <UIcon :name="sys.icon" class="card-icon" />
            <div class="card-text">
              <p class="title">
                {{ sys.label }}
              </p>
              <p class="description">
                {{ sys.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UFormField>

    <UFormField label="Nível de Atividade" :error="validationErrors.activityLevel">
      <div class="selection-grid activity-grid">
        <div
          v-for="act in activityLevels" :key="act.value"
          :class="['selection-card activity-card', state.step2.activityLevel === act.value ? 'active' : '']"
          :id="`activity-level-${act.value}`"
          @click="state.step2.activityLevel = act.value"
        >
          <div class="card-content vertical">
            <UIcon :name="act.icon" class="card-icon large" />
            <div class="card-text center">
              <p class="title">
                {{ act.label }}
              </p>
              <p class="description small">
                {{ act.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UFormField>
  </div>
</template>

<style lang="scss" scoped>
.systems-activity-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.selection-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &.activity-grid {
    @media (min-width: 640px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.selection-card {
  padding: 1rem;
  border: 2px solid var(--ui-border-accent, #e2e8f0);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;

  .dark & {
    background-color: #1e293b;
    border-color: #334155;
  }

  &:hover {
    border-color: var(--ui-primary, #10b981);
    transform: translateY(-2px);
  }

  &.active {
    border-color: var(--ui-primary, #10b981);
    background-color: rgba(var(--ui-primary-rgb, 16, 185, 129), 0.05);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}

.card-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &.vertical {
    flex-direction: column;
    text-align: center;
  }
}

.card-icon {
  font-size: 1.5rem;
  color: var(--ui-primary, #10b981);

  &.large {
    font-size: 2rem;
  }
}

.card-text {
  .title {
    font-weight: 800;
    color: #1e293b;
    
    .dark & {
      color: white;
    }
  }

  .description {
    font-size: 0.75rem;
    color: #64748b;

    &.small {
      font-size: 0.625rem;
      line-height: 1.2;
    }
  }

  &.center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

:deep(label) {
  color: #064e3b;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  display: block;
  font-size: 0.8rem;

  .dark & {
    color: #34d399;
  }
}
</style>
