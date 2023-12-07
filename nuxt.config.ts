// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", '@nuxt/image', 'nuxt-swiper', '@pinia/nuxt',],
  pages: true,
  css: ['~/assets/css/main.css'],
  // auth: {
  //   globalAppMiddleware: true,
  // },W
});
