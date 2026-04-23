<script setup lang="ts">
definePageMeta({
    layout: 'wizard'
})

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
const racaSelecionada = ref('Nelore')

const pesoVivo = ref(0)
const cms = ref(0)
</script>

<template>
    <UContainer class="container">
        <UFormField label="Raça do animal" class="form-field">
            <USelect v-model="racaSelecionada" :items="racas" class="select" />
        </UFormField>

        <UFormField label="Peso vivo (kg)" help="Peso atual do animal" class="form-field">
            <UInput type="number" v-model="pesoVivo" placeholder="Ex: 450" />
        </UFormField>
    </UContainer>
    <UContainer class="cms">
        <WizardCmsSelector label="% do Peso Vivo (CMS)" :pesoVivo="pesoVivo" />
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