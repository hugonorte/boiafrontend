<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
/**
 * BOIA APP - Landing Page
 * Using standard Nuxt UI v3/v4 components
 */

const links = [
  {
    label: 'Começar agora',
    to: '/calc/passo-1/dados-do-animal',
    color: 'primary' as const,
    size: 'xl' as const,
    icon: 'i-heroicons-rocket-launch'
  },
  {
    label: 'Saiba mais',
    to: 'https://boia.app.br',
    color: 'neutral' as const,
    variant: 'ghost' as const,
    size: 'xl' as const,
    trailingIcon: 'i-heroicons-arrow-right'
  }
]

const hlinks = ref<ButtonProps[]>([
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/hugonorte/boiafrontend',
    target: '_blank'
  }
])
</script>

<template>
  <UContainer>
  <UPageHeader
  title="BOIA"
  headline="BETA"
  :links="hlinks"
/>
</UContainer>
  <UContainer class="py-24 sm:py-32">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Conteúdo de Texto -->
      <div class="text-left">
        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
          Nutrição Animal de <span class="text-primary-600">Alta Precisão</span>
        </h1>
        <p class="text-lg text-slate-600 mb-10 leading-relaxed">
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
        <div class="absolute -inset-4 bg-primary-100 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
        <img
          src="/img/hero.avif"
          width="800"
          height="600"
          alt="Ilustração BOIA APP"
          class="relative w-full rounded-2xl shadow-2xl border border-slate-200"
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
