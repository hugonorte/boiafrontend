<script setup lang="ts">
definePageMeta({
    layout: 'wizard'
})

const { state } = useWizardState()


</script>

<template>
    <UContainer class="step-container">
        <!-- Resumo do Passo 1 -->
        <UAlert 
            icon="i-heroicons-information-circle" 
            color="primary" 
            variant="subtle"
            title="Dados do Animal"
            :description="`Peso Vivo: ${state.step1.liveWeight}kg | CMS Estimado: ${state.step1.totalCMS.toFixed(2)} kg/dia`"
        />
        <WizardSistemaProducao />
        <UDivider />
        <WizardAtividade />
    </UContainer>
</template>

<style lang="scss" scoped>
.step-container {
    padding-top: 1.5rem;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}


</style>