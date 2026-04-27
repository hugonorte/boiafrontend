<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="py-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <UContainer>
        <p class="text-center text-sm text-gray-500">
          &copy; 2026 Boia App - Sistema de Formulação de Ração Bovinas
        </p>
      </UContainer>
    </footer>
  </div>
</template>
