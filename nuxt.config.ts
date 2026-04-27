// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  devtools: {
    enabled: true
  },

  sourcemap: false,

  css: ['~/assets/css/app.css'],

  routeRules: {
    '/': { prerender: true }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-15',
  
  colorMode: {
    preference: 'light',
    fallback: 'light',
    storage: 'localStorage',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  hooks: {
    'nitro:config'(nitroConfig) {
      if (nitroConfig.imports) {
        // Suppress "Duplicated imports useAppConfig" warning by removing duplicate registration
        nitroConfig.imports.imports = (nitroConfig.imports.imports || []).filter(
          (i: any) => i?.name !== 'useAppConfig'
        )
      }
    }
  }
})
