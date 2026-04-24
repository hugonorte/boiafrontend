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

const { state, logState } = useWizardState()

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
    logState('Voltar')
    current.value--
}

const handleNext = () => {
    logState('Avançar')
    if (current.value < items.length - 1) {
        current.value++
    }
}
</script>

<template>
    <div class="wizard-layout-agro">
        <UContainer class="py-10">
            <!-- Stepper seguindo o padrão Nuxt UI -->
            <UStepper v-model="current" :items="items" color="primary" class="mb-10" />

            <UCard class="premium-card">
                <template #header>
                    <div class="card-header-agro">
                        <h1 class="text-xl font-black text-slate-800 uppercase tracking-tight">
                            {{ items[current].title }}
                        </h1>
                        <p class="text-sm text-slate-500 font-medium">
                            {{ items[current].description }}
                        </p>
                    </div>
                </template>

                <div class="page-content-wrapper">
                    <slot />
                </div>

                <template #footer>
                    <div class="flex justify-between items-center">
                        <UButton v-if="current > 0" color="neutral" variant="ghost" icon="i-heroicons-arrow-left"
                            @click="handlePrev">
                            Passo anterior: {{ items[current - 1]?.title }}
                        </UButton>
                        <div v-else />

                        <UButton color="primary" :trailing-icon="current === items.length - 1 ? 'i-heroicons-check' : 'i-heroicons-arrow-right'" size="lg"
                            class="px-8 font-bold" @click="handleNext">
                            {{ current === items.length - 1 ? 'Salvar ração e fechar' : `Próximo Passo: ${items[current + 1]?.title}` }}
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UContainer>
    </div>
</template>

<style lang="scss">
.wizard-layout-agro {
    min-height: 100vh;
    background-color: #0f172a; 
    background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
    background-size: 32px 32px;

    .premium-card {
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
        overflow: hidden;

        .card-header-agro {
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 0.5rem;
        }

        .page-content-wrapper {
            min-height: 300px;
        }
    }
}
</style>
