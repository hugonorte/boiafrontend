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

const estimatedCMS = (pesoVivo: number, cms: number) => {
  return (((pesoVivo || 0) * (cms || 0))/100)
}

const cmsPorPesoVivo = ref(0)
const selectCustom = ref(false)
const customValue = ref(0)

const cmsPresets = [
  { label: 'BAIXO 1.8%', value: 1.8 },
  { label: 'MÉDIO 2.2%', value: 2.2 },
  { label: 'ALTO 2.5%', value: 2.5 }
]

const handlePreset = (val: number) => {
  selectCustom.value = false
  cmsPorPesoVivo.value = estimatedCMS(props.pesoVivo, val)
}

const handleCustomInput = () => {
  cmsPorPesoVivo.value = estimatedCMS(props.pesoVivo, customValue.value)
}
</script>

<template>
  <div class="cms-selector-component">
    <label v-if="label" class="group-label">{{ label }}</label>
    <div class="segmented-control">
      <button 
        v-for="preset in cmsPresets" 
        :key="preset.value"
        class="segment-btn"
        @click="handlePreset(preset.value)"
      >
        {{ preset.label }}
      </button>
      <button 
        class="segment-btn"
        :class="{ active: selectCustom }"
        @click="selectCustom = !selectCustom"
      >
        <UIcon name="i-heroicons-pencil-square" class="mr-1" />
        PERSONALIZADO
      </button>
    </div>

    <div v-if="selectCustom" class="custom-input-wrapper mt-4">
      <UInput 
        v-model="customValue" 
        type="number" 
        step="0.1" 
        placeholder="Informe o valor (ex: 2.2)" 
        size="lg"
        @update:model-value="handleCustomInput"
      />
    </div>

    <div class="mt-4 p-4 bg-gray-50 rounded-lg text-center border-2 border-dashed border-gray-200">
      <template v-if="props.pesoVivo > 0">
        <p class="text-lg font-semibold text-slate-800">
          Consumo estimado: CMS = {{ Number(cmsPorPesoVivo).toFixed(2) }} kg/dia
        </p>
        <UBadge color="primary" variant="subtle" class="mt-2">
          {{ ((Number(cmsPorPesoVivo) / (props.pesoVivo || 1))/100).toFixed(1) }}% do Peso Vivo
        </UBadge>
      </template>
      <template v-else>
        <p class="text-sm text-gray-400 italic">Aguardando definição do Peso Vivo...</p>
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
