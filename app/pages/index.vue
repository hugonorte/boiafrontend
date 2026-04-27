<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { NavigationMenuItem } from '@nuxt/ui'
/**
 * BOIA APP - Landing Page
 * Using standard Nuxt UI v3/v4 components
 */

const route = useRoute()
const colorMode = useColorMode()

const items = [
  {
    label: 'Calculadora',
    icon: 'i-heroicons-calculator',
    to: '/calc/passo-1/dados-do-animal'
  },
]

const links = [
  {
    label: 'Começar agora',
    to: '/calc/passo-1/dados-do-animal',
    color: 'primary' as const,
    size: 'xl' as const,
    icon: 'i-heroicons-calculator'
  },
  // {
  //   label: 'Saiba mais',
  //   to: 'https://boia.app.br',
  //   color: 'neutral' as const,
  //   variant: 'ghost' as const,
  //   size: 'xl' as const,
  //   trailingIcon: 'i-heroicons-arrow-right'
  // }
]
</script>

<template>
   <UHeader>
    <template #title>
      <Logo :theme="colorMode.value"/>  
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/hugonorte/boiafrontend"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
  <UContainer class="py-12 sm:py-32">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Conteúdo de Texto -->
      <div class="text-left">
        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-6">
          Nutrição Animal de <span class="text-primary-600 dark:text-primary-400">Alta Precisão</span>
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
          O BOIA APP utiliza inteligência e algoritmos avançados para calcular a dieta ideal para o seu rebanho, maximizando resultados e reduzindo custos operacionais.
        </p>
        <div class="flex flex-wrap gap-4">
          <UButton
            v-for="(link, index) in links"
            :key="index"
            v-bind="link"
            class="rounded-full px-8 py-4 font-bold transition-all hover:scale-105"
          />
        </div>
      </div>

      <!-- Ilustração/Imagem -->
      <div class="relative">
        <div class="absolute -inset-4 bg-primary-100 dark:bg-primary-900/20 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
        <img
          src="/img/hero.avif"
          width="800"
          height="600"
          alt="Ilustração BOIA APP"
          class="relative w-full rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
          loading="lazy"
        />
      </div>
    </div>
  </UContainer>
</template>

<style scoped lang="scss">
/* Estilos específicos para a landing page para evitar o erro 'scoped' do Vite */
.text-primary-600 {
  color: var(--color-primary-600);
}
</style>
