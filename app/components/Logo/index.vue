<script setup lang="ts">
const props = withDefaults(defineProps<{
  width?: string
  theme?: 'dark' | 'light' | string
  class?: string
}>(), {
  width: '150px',
  theme: 'dark',
  class: '',
})

const logoSrc = computed(() => {
  if(props.theme === 'dark') {
    return '/img/logo-dark.svg'
  }
  return '/img/logo-light.svg'
})
</script>

<template>
  <img 
    :style="{ width: props.width }" 
    :src="logoSrc" 
    alt="BOIA APP" 
    :class="props.class">
</template>