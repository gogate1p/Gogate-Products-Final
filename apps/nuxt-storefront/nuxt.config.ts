export default defineNuxtConfig({
  compatibilityDate: '2026-10-27',
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || (process.env.VERCEL ? '/regional' : '/'),
    head: {
      title: 'Gogate Products - Nuxt SSR Regional Storefront',
      meta: [
        { name: 'description', content: 'Regional Nuxt 3 Storefront for Gogate Organic Agro Products' }
      ]
    }
  }
});
