// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Barbakan Delicatessen & Bakery | Manchester Since 1964',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "Manchester's finest artisan bakery and continental deli, handcrafting traditional European baked goods since 1964. Award-winning breads, pastries, and deli fare." },
        { property: 'og:title', content: 'Barbakan Delicatessen & Bakery | Manchester Since 1964' },
        { property: 'og:description', content: "Award-winning artisan bakery & continental deli in Chorlton and Wilmslow. 62 years of authentic, handmade baking." },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
})