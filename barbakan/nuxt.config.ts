// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Barbakan Delicatessen & Bakery | Manchester Since 1964',
      htmlAttrs: { lang: 'en-GB' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "Manchester's finest artisan bakery and continental deli, handcrafting traditional European baked goods since 1964. Award-winning breads, pastries, and deli fare." },
        { name: 'theme-color', content: '#8B1A1A' },
        { property: 'og:title', content: 'Barbakan Delicatessen & Bakery | Manchester Since 1964' },
        { property: 'og:description', content: "Award-winning artisan bakery & continental deli in Chorlton and Wilmslow. 62 years of authentic, handmade baking." },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Barbakan' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Bakery",
            "name": "Barbakan Delicatessen & Bakery",
            "description": "Award-winning artisan bakery and continental deli in Chorlton and Wilmslow, Manchester since 1964.",
            "url": "https://barbakan-deli.co.uk",
            "foundingDate": "1964",
            "address": [
              { "@type": "PostalAddress", "streetAddress": "67-71 Manchester Road", "addressLocality": "Manchester", "postalCode": "M21 9PW", "addressRegion": "England", "addressCountry": "GB" },
              { "@type": "PostalAddress", "streetAddress": "1A Moor Lane", "addressLocality": "Wilmslow", "postalCode": "SK9 6AG", "addressRegion": "Cheshire", "addressCountry": "GB" }
            ],
            "telephone": "0161 881 7053",
            "priceRange": "££",
            "servedCuisine": "Bakery, Deli, European"
          })
        }
      ]
    },
  },
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'node-server'
  },
  experimental: {
    payloadExtraction: false
  }
})
