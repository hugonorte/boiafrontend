<script setup lang="ts">
interface Item {
  label: string
  value: string
  description?: string
  icon?: string
}

const props = defineProps<{
  items: Item[]
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const selectItem = (val: string) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <div class="selection-cards-grid">
    <UPageCard
      v-for="item in items"
      :key="item.value"
      :title="item.label"
      :description="item.description"
      :icon="item.icon"
      :class="['selection-card', { selected: modelValue === item.value }]"
      @click="selectItem(item.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
.selection-cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  width: 100%;

  .selection-card {
    flex: 1 1 calc(50% - 0.75rem);
    min-width: 250px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-4px);
      background-color: #f8fafc;
    }

    &.selected {
      border-color: #075a26;
      background-color: #f0fdf4;
      box-shadow: 0 0 0 2px #075a26, 0 8px 12px -3px rgba(0, 0, 0, 0.1);
      transform: scale(1.02);

      :deep(.u-page-card-icon) {
        color: #075a26;
      }
    }
  }
}

// Responsividade para 1 coluna em telas muito pequenas
@media (max-width: 640px) {
  .selection-cards-grid .selection-card {
    flex: 1 1 100%;
  }
}
</style>
