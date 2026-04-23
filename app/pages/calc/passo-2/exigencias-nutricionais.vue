<script setup lang="ts">
definePageMeta({
    layout: 'wizard'
})

const { state } = useWizardState()

const objectives = [
    { label: 'Mantença', value: 'Mantença', pb: 10, ndt: 55, fdn: 50 },
    { label: 'Cria', value: 'Cria', pb: 11, ndt: 58, fdn: 52 },
    { label: 'Recria', value: 'Recria', pb: 12, ndt: 60, fdn: 55 },
    { label: 'Terminação', value: 'Terminação', pb: 13, ndt: 63, fdn: 58 },
    { label: 'Reprodução', value: 'Reprodução', pb: 12, ndt: 60, fdn: 55 },
    { label: 'Ganho intensivo', value: 'Ganho intensivo', pb: 14, ndt: 65, fdn: 60 },
    { label: 'Personalizado', value: 'Personalizado' }
]

const handleObjectiveChange = (val: string) => {
    const selected = objectives.find(obj => obj.value === val)
    if (selected && val !== 'Personalizado') {
        state.value.step2.pb = selected.pb || 0
        state.value.step2.ndt = selected.ndt || 0
        state.value.step2.fdn = selected.fdn || 0
    }
}
</script>

<template>
    <UContainer class="py-6 space-y-8">
        <!-- Resumo do Passo 1 -->
        <UAlert 
            icon="i-heroicons-information-circle" 
            color="primary" 
            variant="subtle"
            title="Dados do Animal"
            :description="`Peso Vivo: ${state.step1.liveWeight}kg | CMS Estimado: ${state.step1.totalCMS.toFixed(2)} kg/dia`"
        />

        <div class="space-y-4">
            <h2 class="text-xl font-bold text-slate-800">Objetivo da Dieta</h2>
            <p class="text-sm text-slate-500">Selecione o objetivo para carregar as exigências sugeridas</p>
            
            <URadioGroup 
                v-model="state.step2.dietObjective" 
                :items="objectives" 
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
                @update:model-value="handleObjectiveChange"
            />
        </div>

        <UDivider />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UFormField label="Proteína Bruta (PB %)" help="Mínimo sugerido para o objetivo">
                <UInput v-model="state.step2.pb" type="number" trailing-icon="i-heroicons-percent-badge" />
            </UFormField>

            <UFormField label="Energia (NDT %)" help="Nutrientes Digestíveis Totais">
                <UInput v-model="state.step2.ndt" type="number" trailing-icon="i-heroicons-bolt" />
            </UFormField>

            <UFormField label="Fibra (FDN %)" help="Fibra em Detergente Neutro">
                <UInput v-model="state.step2.fdn" type="number" trailing-icon="i-heroicons-list-bullet" />
            </UFormField>
        </div>

        <div class="bg-amber-50 p-4 rounded-lg border border-amber-100" v-if="state.step2.dietObjective === 'Personalizado'">
            <p class="text-sm text-amber-800 italic">
                <UIcon name="i-heroicons-exclamation-triangle" class="mr-1" />
                Você está no modo personalizado. Ajuste os valores nutricionais conforme a orientação do seu técnico.
            </p>
        </div>
    </UContainer>
</template>

<style lang="scss" scoped>
.grid {
    :deep(.u-radio-group-items) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
    }
}
</style>