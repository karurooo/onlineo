// plugins/check-auth.js
import { defineNuxtPlugin } from "#app";
import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();

  nuxtApp.hook("app:mounted", () => {
    authStore.initialize();
  });

  nuxtApp.hook("page:middleware", (to, from) => {
    // Called only on client-side and only on page load
    if (!authStore.isAuthenticated) {
      console.log("Not authenticated");
    }
  });
});
