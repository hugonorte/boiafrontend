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

// Watcher para garantir que o totalCMS esteja sempre sincronizado
watch(() => [props.pesoVivo, state.value.step1.cmsPercentage], () => {
  estimatedCMS(props.pesoVivo, state.value.step1.cmsPercentage)
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
          class="mr-1"
        />
        PERSONALIZADO
      </button>
    </div>

    <div
      v-if="state.step1.isCustomCMS"
      class="custom-input-wrapper mt-4"
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

    <div class="mt-4 p-4 bg-gray-50 rounded-lg text-center border-2 border-dashed border-gray-200">
      <template v-if="props.pesoVivo > 0 && state.step1.initialCMSEstimate > 0">
        <div class="text-slate-800">
          <p class="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">
            Consumo Estimado
          </p>
          <p class="text-3xl font-black text-primary-600">
            {{ state.step1.initialCMSEstimate.toFixed(2) }}
            <span class="text-lg">
              kg/dia
            </span>
          </p>
          <UBadge
            color="primary"
            variant="subtle"
            class="mt-2 font-bold"
          >
            {{ ((state.step1.initialCMSEstimate / props.pesoVivo) * 100).toFixed(1) }}% do Peso Vivo
          </UBadge>
          <UAlert
            icon="i-lucide-info"
            color="neutral"
            variant="subtle"
            class="mt-4"
            description="O consumo de matéria seca representa a quantidade de alimento que o animal ingere diariamente, desconsiderando a água."
          />
        </div>
      </template>
      <template v-else>
        <p class="text-sm text-gray-400 italic">
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

      &.active {
        background-color: white;
        color: #075a26;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      &:hover:not(.active) {
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
