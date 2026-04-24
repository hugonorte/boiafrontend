<script setup lang="ts">
const { state, validationErrors } = useWizardState()

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

const activityLevels = [
    { 
        label: 'Baixo', 
        value: 'baixo', 
        icon: 'i-heroicons-bolt-slash', 
        description: 'Animais confinados ou com deslocamento mínimo.' 
    },
    { 
        label: 'Médio', 
        value: 'médio', 
        icon: 'i-heroicons-bolt', 
        description: 'Animais em pastagens planas com deslocamento moderado.' 
    },
    { 
        label: 'Alto', 
        value: 'alto', 
        icon: 'i-heroicons-fire', 
        description: 'Animais em terrenos acidentados ou grandes distâncias.' 
    }
]
</script>

<template>
    <div class="flex flex-col gap-10">
        <UFormField label="Sistema de Produção" :error="validationErrors.productionSystem">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="sys in systems" :key="sys.value" 
                     :class="['p-4 border-2 rounded-xl cursor-pointer transition-all', state.step2.productionSystem === sys.value ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300 bg-white']"
                     @click="state.step2.productionSystem = sys.value"
                     :id="`production-system-${sys.value}`">
                    <div class="flex items-center gap-3">
                        <UIcon :name="sys.icon" class="text-2xl text-primary-600" />
                        <div>
                            <p class="font-bold text-slate-900">{{ sys.label }}</p>
                            <p class="text-xs text-slate-500">{{ sys.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </UFormField>

        <UFormField label="Nível de Atividade" :error="validationErrors.activityLevel">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="act in activityLevels" :key="act.value" 
                     :class="['p-4 border-2 rounded-xl cursor-pointer transition-all', state.step2.activityLevel === act.value ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300 bg-white']"
                     @click="state.step2.activityLevel = act.value"
                     :id="`activity-level-${act.value}`">
                    <div class="flex flex-col items-center text-center gap-2">
                        <UIcon :name="act.icon" class="text-3xl text-primary-600" />
                        <div>
                            <p class="font-bold text-slate-900">{{ act.label }}</p>
                            <p class="text-[10px] leading-tight text-slate-500 mt-1">{{ act.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </UFormField>
    </div>
</template>

<style lang="scss" scoped>
:deep(label) {
    color: rgb(7, 52, 17);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
    display: block;
    font-size: 0.875rem;
}
</style>
