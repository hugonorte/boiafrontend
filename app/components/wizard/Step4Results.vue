<script setup lang="ts">
const { state } = useWizardState()

const nutritionData = computed(() => [
  { nutrient: 'Proteína Bruta (PB)', ideal: `${state.value.step2.pb}%`, reached: '11.5%', status: 'yellow', icon: 'i-heroicons-exclamation-triangle' },
  { nutrient: 'Energia (NDT)', ideal: `${state.value.step2.ndt}%`, reached: '62%', status: 'green', icon: 'i-heroicons-check-circle' },
  { nutrient: 'Fibra (FDN)', ideal: `${state.value.step2.fdn}%`, reached: '52%', status: 'green', icon: 'i-heroicons-check-circle' }
])

const economicData = [
  { label: 'Custo Total', day: 'R$ 12,50', kg: 'R$ 1,25' }
]

const columns = [
  { key: 'nutrient', label: 'Nutriente' },
  { key: 'ideal', label: 'Ideal' },
  { key: 'reached', label: 'Atingido' }
]
</script>

<template>
  <div class="step-content space-y-6">
    <UCard class="premium-card">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900">Resultado da Dieta</h2>
          <p class="text-gray-500">Análise nutricional e econômica da formulação</p>
        </div>
      </template>

      <div class="space-y-8">
        <!-- Overall Status -->
        <div class="flex flex-col items-center">
          <UBadge color="yellow" variant="solid" size="lg" class="px-6 py-2 text-lg">
            🟡 Dieta em análise
          </UBadge>
          <p class="text-sm text-gray-500 mt-2">Ajustes recomendados para atingir a proteína ideal</p>
        </div>

        <!-- Nutrient Progress -->
        <div class="space-y-4">
          <h3 class="font-semibold text-lg border-b pb-2">Composição Nutricional</h3>
          <div v-for="item in nutritionData" :key="item.nutrient" class="space-y-1">
            <div class="flex justify-between text-sm">
              <span>{{ item.nutrient }}</span>
              <span :class="`text-${item.status}-600 font-bold`">{{ item.reached }}</span>
            </div>
            <UProgress :value="80" :color="item.status" />
          </div>
        </div>

        <!-- Nutritional Table -->
        <UTable :columns="columns" :rows="nutritionData">
          <template #reached-data="{ row }">
            <span :class="row.status === 'green' ? 'text-green-600' : 'text-yellow-600'">
              {{ row.reached }}
              <UIcon :name="row.icon" class="ml-1" />
            </span>
          </template>
        </UTable>

        <!-- Economic Summary -->
        <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 class="font-semibold text-lg mb-4">Resumo Econômico</h3>
          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="p-4 bg-white rounded-lg shadow-sm">
              <p class="text-xs text-gray-500 uppercase">Custo por Dia</p>
              <p class="text-2xl font-bold text-primary-600">R$ 12,50</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-sm">
              <p class="text-xs text-gray-500 uppercase">Custo por Kg</p>
              <p class="text-2xl font-bold text-primary-600">R$ 1,25</p>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <UAlert
          color="yellow"
          variant="subtle"
          icon="i-heroicons-light-bulb"
          title="Recomendações"
          description="Aumentar farelo de soja para elevar proteína. Adicionar fonte de fibra se necessário."
        />

        <!-- Actions -->
        <div class="flex gap-4">
          <UButton color="gray" variant="outline" icon="i-heroicons-document-arrow-down" class="flex-1">
            Exportar PDF
          </UButton>
          <UButton color="gray" variant="outline" icon="i-heroicons-table-cells" class="flex-1">
            Exportar Excel
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
