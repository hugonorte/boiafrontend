<script setup lang="ts">
const { state } = useWizardState()

const systems = [
    { 
        label: 'Pasto extensivo', 
        value: 'pasto_extensivo', 
        icon: 'i-heroicons-sun', 
        description: 'Sistema tradicional em grandes áreas com baixa lotação.' 
    },
    { 
        label: 'Pasto rotacionado', 
        value: 'pasto_rotacionado', 
        icon: 'i-heroicons-arrow-path', 
        description: 'Manejo intensivo de pastagem com divisão de piquetes.' 
    },
    { 
        label: 'Semi-confinamento', 
        value: 'semi_confinamento', 
        icon: 'i-heroicons-home', 
        description: 'Suplementação no cocho para animais mantidos a pasto.' 
    },
    { 
        label: 'Confinamento', 
        value: 'confinamento', 
        icon: 'i-heroicons-building-office-2', 
        description: 'Engorda intensiva com dieta 100% fornecida no cocho.' 
    }
]
</script>

<template>
    <UFormField label="Sistema de Produção" class="form-field">
        <WizardSelectionCards 
            v-model="state.step2.productionSystem" 
            :items="systems" 
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
</style>
