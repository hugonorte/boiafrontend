<script setup lang="ts">
const { state } = useWizardState()

definePageMeta({
    layout: 'wizard'
})

// Definição das colunas seguindo o padrão TanStack Table do Nuxt UI v4
const columns = [
    { accessorKey: 'nome', header: 'Ingrediente' },
    { accessorKey: 'ms', header: 'MS (%)' },
    { accessorKey: 'pb', header: 'PB (%)' },
    { accessorKey: 'fdn', header: 'FDN (%)' },
    { accessorKey: 'em', header: 'EM (Mcal)' },
    { accessorKey: 'custo', header: 'Custo (R$/kg)' }
]

// Lista de ingredientes vindos do estado global
const selectedIngredients = computed(() => state.value.step3.selectedIngredients || [])
</script>

<template>
    <UContainer class="step-container">
        <ClientOnly>
            <div class="step-header">
                <h2 class="step-title">Resumo da Seleção</h2>
                <p class="step-description">Confira abaixo os ingredientes selecionados e seus respectivos valores nutricionais.</p>
            </div>

            <UCard class="result-card">
                <div v-if="selectedIngredients.length > 0">
                    <UTable 
                        :data="selectedIngredients" 
                        :columns="columns"
                        class="w-full"
                    >
                        <!-- Customização das células usando o padrão #[accessorKey]-cell -->
                        
                        <template #nome-cell="{ cell }">
                            <span class="font-semibold text-slate-900">{{ cell.getValue() }}</span>
                        </template>

                        <template #ms-cell="{ cell }">
                            <span class="text-slate-600">{{ (cell.getValue() as number ?? 0).toFixed(1) }}%</span>
                        </template>

                        <template #pb-cell="{ cell }">
                            <UBadge color="success" variant="soft" size="sm">
                                {{ (cell.getValue() as number ?? 0).toFixed(1) }}%
                            </UBadge>
                        </template>

                        <template #fdn-cell="{ cell }">
                            <span class="text-slate-600">{{ (cell.getValue() as number ?? 0).toFixed(1) }}%</span>
                        </template>

                        <template #em-cell="{ cell }">
                            <span class="text-slate-600">{{ (cell.getValue() as number ?? 0).toFixed(2) }}</span>
                        </template>

                        <template #custo-cell="{ cell }">
                            <span class="font-medium text-primary-600">R$ {{ (cell.getValue() as number ?? 0).toFixed(2) }}</span>
                        </template>

                        <template #empty>
                            <div class="py-12 text-center">
                                <p class="text-sm text-slate-500">Nenhum dado para exibir.</p>
                            </div>
                        </template>
                    </UTable>

                    <div class="summary-footer mt-4">
                        <p class="text-sm text-slate-500">
                            Total de ingredientes selecionados: <span class="font-bold text-primary">{{ selectedIngredients.length }}</span>
                        </p>
                    </div>
                </div>

                <div v-else class="empty-results py-20 text-center">
                    <UIcon name="i-heroicons-beaker" class="w-12 h-12 text-slate-300 mb-4" />
                    <h3 class="text-lg font-medium text-slate-900">Nenhum ingrediente selecionado</h3>
                    <p class="text-slate-500 mb-6">Volte ao passo anterior para selecionar os alimentos da dieta.</p>
                    <UButton 
                        to="/calc/passo-3/ingredientes" 
                        color="primary" 
                        variant="soft" 
                        icon="i-heroicons-arrow-left"
                    >
                        Voltar para Ingredientes
                    </UButton>
                </div>
            </UCard>
            
            <div class="actions-footer mt-8 flex justify-between">
                <UButton
                    to="/calc/passo-3/ingredientes"
                    variant="outline"
                    color="neutral"
                    icon="i-heroicons-arrow-left"
                >
                    Voltar
                </UButton>
                
                <UButton
                    color="primary"
                    trailing-icon="i-heroicons-check-circle"
                    size="lg"
                >
                    Finalizar Cálculo
                </UButton>
            </div>
        </ClientOnly>
    </UContainer>
</template>

<style lang="scss" scoped>
.step-container {
    padding-top: 2rem;
    padding-bottom: 4rem;
}

.step-header {
    margin-bottom: 2rem;
    text-align: left;

    .step-title {
        font-size: 1.875rem;
        font-weight: 800;
        color: #0f172a;
        letter-spacing: -0.025em;
        margin-bottom: 0.5rem;
    }

    .step-description {
        font-size: 1.125rem;
        color: #64748b;
    }
}

.result-card {
    background: white;
    border-radius: 1.25rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border: 1px solid #e2e8f0;
    overflow: hidden;
}

.summary-footer {
    padding: 1.25rem;
    border-top: 1px solid #f1f5f9;
    background-color: #f8fafc;
}

.empty-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>