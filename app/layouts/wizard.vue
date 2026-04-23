<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const route = useRoute()

const items = [
    {
        title: 'Consumo de Matéria Seca (CMS)',
        description: 'Estimativa de consumo diário.',
        icon: 'i-heroicons-user'
    },
    {
        title: 'Exigências nutricionais',
        description: 'Requisitos nutricionais do animal',
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
            '/calc/passo-1/cms',
            '/calc/passo-2/exigencias-nutricionais',
            '/calc/passo-3/ingredientes',
            '/calc/passo-4/resultado'
        ]
        if (paths[val]) navigateTo(paths[val])
    }
})
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
                            @click="current--">
                            Voltar
                        </UButton>
                        <div v-else />

                        <UButton color="primary" trailing-icon="i-heroicons-arrow-right" size="lg"
                            class="px-8 font-bold" @click="current < 3 ? current++ : null">
                            {{ current === 3 ? 'Finalizar' : 'Próximo Passo' }}
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
