<script setup lang="ts">
/**
 * CmsSelector.vue
 * Segmented control for CMS percentage selection (Low, Medium, High, Custom)
 */

const props = defineProps({
  label: {
    type: String,
    default: '% do Peso Vivo (CMS)'
  },
  pesoVivo: {
    type: Number,
    default: 1
  }
})

const { state } = useWizardState()

const estimatedCMS = (pesoVivo: number, cms: number) => {
  const result = ((pesoVivo || 0) * (cms || 0)) / 100
  state.value.step1.initialCMSEstimate = result
  return result
}

// Watcher para garantir que o totalCMS esteja sempre sincronizado com o estado global
watch(() => [state.value.step1.liveWeight, state.value.step1.cmsPercentage], () => {
  estimatedCMS(state.value.step1.liveWeight, state.value.step1.cmsPercentage)
}, { immediate: true })

const cmsPresets = [
  { label: 'BAIXO 1.8%', value: 1.8 },
  { label: 'MÉDIO 2.2%', value: 2.2 },
  { label: 'ALTO 2.5%', value: 2.5 }
]

  const handlePreset = (val: number) => {
  state.value.step1.isCustomCMS = false
  state.value.step1.cmsPercentage = val
}

const handleCustomInput = () => {
  state.value.step1.isCustomCMS = true
  state.value.step1.cmsPercentage = state.value.step1.cmsCustomValue || 0
}
</script>

<template>
  <div class="cms-selector-component">
    <label
      v-if="label"
      class="group-label"
    >
      {{ label }}
    </label>
    <div class="segmented-control">
      <button
        v-for="preset in cmsPresets"
        :key="preset.value"
        class="segment-btn"
        :class="{ active: state.step1.cmsPercentage === preset.value && !state.step1.isCustomCMS }"
        @click="handlePreset(preset.value)"
      >
        {{ preset.label }}
      </button>
      <button
        class="segment-btn"
        :class="{ active: state.step1.isCustomCMS }"
        @click="state.step1.isCustomCMS = !state.step1.isCustomCMS"
      >
        <UIcon
          name="i-heroicons-pencil-square"
          class="icon-prefix"
        />
        PERSONALIZADO
      </button>
    </div>

    <div
      v-if="state.step1.isCustomCMS"
      class="custom-input-wrapper"
    >
      <UInput
        v-model="state.step1.cmsCustomValue"
        type="number"
        step="0.1"
        placeholder="Informe o valor (ex: 2.2)"
        size="lg"
        @update:model-value="handleCustomInput"
      />
    </div>

    <div class="estimate-box">
      <template v-if="props.pesoVivo > 0 && state.step1.initialCMSEstimate > 0">
        <div class="estimate-content">
          <p class="estimate-label">
            Consumo Estimado
          </p>
          <p class="estimate-value">
            {{ state.step1.initialCMSEstimate.toFixed(2) }}
            <span class="unit">
              kg/dia
            </span>
          </p>
          <UBadge
            color="primary"
            variant="subtle"
            class="percentage-badge"
          >
            {{ ((state.step1.initialCMSEstimate / props.pesoVivo) * 100).toFixed(1) }}% do Peso Vivo
          </UBadge>
          <UAlert
            icon="i-lucide-info"
            color="neutral"
            variant="subtle"
            class="info-alert"
            description="O consumo de matéria seca representa a quantidade de alimento que o animal ingere diariamente, desconsiderando a água."
          />
        </div>
      </template>
      <template v-else>
        <p class="waiting-text">
          Aguardando definição do Peso Vivo e CMS...
        </p>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cms-selector-component {
  .group-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    margin-bottom: 0.75rem;
  }

  .segmented-control {
    display: flex;
    background-color: #f1f5f9;
    padding: 0.25rem;
    border-radius: 12px;
    gap: 0.25rem;
    transition: background-color 0.2s ease;

    .dark & {
      background-color: #1e293b;
    }

    .segment-btn {
      flex: 1;
      padding: 0.75rem 0.5rem;
      font-size: 0.7rem;
      font-weight: 800;
      border-radius: 10px;
      border: none;
      background: transparent;
      color: #64748b;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .icon-prefix {
        margin-right: 0.25rem;
      }

      &.active {
        background-color: white;
        color: #075a26;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

        .dark & {
          background-color: #334155;
          color: white;
        }
      }

      &:hover:not(.active) {
        background-color: rgba(255, 255, 255, 0.5);
        
        .dark & {
          background-color: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }

  .custom-input-wrapper {
    margin-top: 1rem;
  }

  .estimate-box {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 0.5rem;
    text-align: center;
    border: 2px dashed #e2e8f0;
    transition: all 0.3s ease;

    .dark & {
      background-color: #0f172a;
      border-color: #1e293b;
    }

    .estimate-label {
      font-size: 0.875rem;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
    }

    .estimate-value {
      font-size: 1.875rem;
      font-weight: 900;
      color: var(--ui-primary, #10b981);

      .unit {
        font-size: 1.125rem;
      }
    }

    .percentage-badge {
      margin-top: 0.5rem;
      font-weight: 700;
    }

    .info-alert {
      margin-top: 1rem;
    }

    .waiting-text {
      font-size: 0.875rem;
      color: #94a3b8;
      font-style: italic;
    }
  }
}
</style>
