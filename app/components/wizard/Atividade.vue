<script setup lang="ts">
const { state } = useWizardState()

const activityLevels = [
  {
    label: 'Baixo',
    value: 'baixo',
    icon: 'i-heroicons-arrow-trending-down',
    description: 'Pouca movimentação ou repouso.'
  },
  {
    label: 'Médio',
    value: 'médio',
    icon: 'i-heroicons-minus',
    description: 'Nível moderado de atividade.'
  },
  {
    label: 'Alto',
    value: 'alto',
    icon: 'i-heroicons-arrow-trending-up',
    description: 'Alta movimentação ou terrenos íngremes.'
  }
]
</script>

<template>
  <UFormField label="Nível de Atividade" class="form-field activity-component">
    <WizardSelectionCards
      v-model="state.step2.activityLevel"
      :items="activityLevels"
      class="activity-cards"
    />
  </UFormField>
</template>

<style lang="scss" scoped>
.form-field {
  width: 100%;

  :deep(label) {
    color: rgb(7, 52, 17);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    margin-bottom: 1rem;
    display: block;
  }
}

.activity-cards {
  display: flex;
  gap: 1.25rem;
  width: 100%;

  :deep(.selection-card) {
    flex: 1; // Divide o espaço igualmente em 3
    min-width: 0; // Permite que encolha abaixo do conteúdo se necessário
  }
}

// Ajuste para telas menores
@media (max-width: 768px) {
  .activity-cards {
    flex-direction: column;
  }
}
</style>
