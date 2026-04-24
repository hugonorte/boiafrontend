<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const route = useRoute()

const items = [
    {
        title: 'Dados do animal',
        description: 'Características do principais',
        icon: 'i-heroicons-user'
    },
    {
        title: 'Sistema de produção',
        description: 'Defina o objetivo e exigências',
        icon: 'i-heroicons-academic-cap'
    },
    {
        title: 'Ingredientes',
        description: 'Ingredientes disponíveis',
        icon: 'i-heroicons-book-open'
    },
    {
        title: 'Resultado',
        description: 'Resultado da análise',
        icon: 'i-heroicons-chart-bar'
    }
] as const satisfies StepperItem[]

const { logState, validateStep } = useWizardState()

// Sync current step with route
const current = computed({
    get: () => {
        if (route.path.includes('passo-1')) return 0
        if (route.path.includes('passo-2')) return 1
        if (route.path.includes('passo-3')) return 2
        if (route.path.includes('passo-4')) return 3
        return 0
    },
    set: (val) => {
        const paths = [
            '/calc/passo-1/dados-do-animal',
            '/calc/passo-2/sistema-de-producao',
            '/calc/passo-3/ingredientes',
            '/calc/passo-4/resultado'
        ]
        if (paths[val]) navigateTo(paths[val])
    }
})

const handlePrev = () => {
    if (current.value > 0) current.value--
}

const handleNext = () => {
    logState() // Debug: Loga o estado a cada tentativa de avanço
    const isValid = validateStep(current.value + 1)
    if (isValid && current.value < items.length - 1) {
        current.value++
    }
}
</script>

<template>
    <div class="wizard-layout-agro min-h-screen bg-slate-950 p-4 md:p-10">
        <UContainer>
            <UStepper v-model="current" :items="items" class="mb-8" />

            <UCard class="bg-white/95 backdrop-blur shadow-2xl rounded-3xl overflow-hidden border border-white/20">
                <template #header>
                    <div class="p-2">
                        <h1 class="text-2xl font-black text-slate-800 uppercase">{{ items[current]?.title }}</h1>
                        <p class="text-slate-500">{{ items[current]?.description }}</p>
                    </div>
                </template>

                <div class="py-4">
                    <slot />
                </div>

                <template #footer>
                    <div class="flex justify-between gap-4">
                        <UButton v-if="current > 0" variant="ghost" color="neutral" @click="handlePrev" icon="i-heroicons-arrow-left">
                            Passo anterior: {{ items[current - 1]?.title }}
                        </UButton>
                        <div v-else />

                        <UButton color="primary" size="xl" class="px-10 font-bold rounded-full" @click="handleNext" trailing-icon="i-heroicons-arrow-right">
                            {{ current === items.length - 1 ? 'Finalizar Cálculo' : 'Próximo passo: ' + items[current + 1]?.title }}
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UContainer>
    </div>
</template>

<style lang="scss">
.wizard-layout-agro {
    background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
    background-size: 32px 32px;
}
</style>
