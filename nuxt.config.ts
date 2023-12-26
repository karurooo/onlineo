// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", '@nuxt/image', 'nuxt-swiper', '@pinia/nuxt', '@unlok-co/nuxt-stripe'],
  pages: true,
  css: ['~/assets/css/main.css'],
  plugins: ['~/plugins/inactivity.js', '~/plugins/checkAuth.js',],
  stripe: {
    server: {
      key: process.env.STRIPE_SERVER_KEY,
      options: {
        apiVersion: '2022-11-15', // optional, default is '2022-11-15'
      }
    },
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
      options: {
        // Options here
      }
    }
  }
});
