<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="py-6 border-t bg-white">
      <UContainer>
        <p class="text-center text-sm text-gray-500">
          &copy; 2026 Boia App - Sistema de Formulação de Ração Bovinas
        </p>
      </UContainer>
    </footer>
  </div>
</template>
