<script setup lang="ts">
definePageMeta({
    layout: 'wizard'
})

const { state } = useWizardState()

const racas = ref([
    'Nelore',
    'Angus',
    'Braford',
    'Charolês',
    'Simental',
    'Guzerá',
    'Tabapuã',
    'Canchim',
    'Pantaneiro',
    'Crioulo',
    'Outra'
])

const sexos = [
    { label: 'Macho', value: 'macho' },
    { label: 'Fêmea', value: 'fêmea' }
]

const dietObjectives = [
    { label: 'Mantença', value: 'mantença', icon: 'i-heroicons-sun', description: 'Equação base para animais em estado de repouso.' },
    { label: 'Ganho de Peso', value: 'ganho', icon: 'i-heroicons-arrow-trending-up', description: 'Para animais em fase de engorda ou crescimento.' },
    { label: 'Gestação', value: 'gestação', icon: 'i-heroicons-user-group', description: 'Ajuste baseado nos dias de gestação.' },
    { label: 'Lactação', value: 'lactação', icon: 'i-heroicons-beaker', description: 'Baseado na produção diária e gordura do leite.' }
]

watch(() => state.value.step1.liveWeight, (newWeight) => {
    if (newWeight > 0) {
        state.value.step1.pesoMetabolico = Math.pow(newWeight, 0.75)
        state.value.step1.EnergiaLiquidaMantenca = state.value.step1.pesoMetabolico * 0.077
    } else {
        state.value.step1.pesoMetabolico = 0
        state.value.step1.EnergiaLiquidaMantenca = 0
    }
})
</script>

<template>
    <UContainer class="container">
        <UFormField label="Raça do animal" class="form-field">
            <USelect v-model="state.step1.animalRace" :items="racas" class="select" />
        </UFormField>

        <div class="row-flex">
            <UFormField label="Sexo" class="form-field field-item">
                <USelect v-model="state.step1.sex" :items="sexos" placeholder="Selecione" />
            </UFormField>

            <UFormField label="Idade (meses)" class="form-field field-item">
                <UInput v-model="state.step1.age" type="number" placeholder="Ex: 24" />
            </UFormField>

            <UFormField label="Peso vivo (kg)" help="Peso atual do animal" class="form-field field-item">
                <UInput type="number" v-model="state.step1.liveWeight" placeholder="Ex: 450" />
            </UFormField>
        </div>

        <UFormField label="Objetivo da Dieta" class="form-field">
            <WizardSelectionCards 
                v-model="state.step1.dietObjective" 
                :items="dietObjectives" 
            />
        </UFormField>
    </UContainer>
</template>

<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.row-flex {
    display: flex;
    gap: 1.5rem;
    width: 100%;

    .field-item {
        flex: 1;
    }
}
.cms {
    margin-top: 2rem;
}
.form-field {
    label{
        color:rgb(7, 52, 17);
    }
    button, div, input {
        width: 100%;
    }
    [data-slot="help"]{
        color:rgb(49, 71, 62);
    }
}
</style>