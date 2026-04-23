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
</script>

<template>
    <UContainer class="container">
        <UFormField label="Raça do animal" class="form-field">
            <USelect v-model="state.step1.animalRace" :items="racas" class="select" />
        </UFormField>

        <UFormField label="Peso vivo (kg)" help="Peso atual do animal" class="form-field">
            <UInput type="number" v-model="state.step1.liveWeight" placeholder="Ex: 450" />
        </UFormField>
    </UContainer>
    <UContainer class="cms">
        <WizardCmsSelector label="% do Peso Vivo (CMS)" :pesoVivo="state.step1.liveWeight" />
    </UContainer>
</template>

<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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