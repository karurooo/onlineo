// middleware/authenticated.js
import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  console.log("Authenticated middleware called");
  console.log("Is user authenticated?", authStore.isAuthenticated);

  if (!authStore.isAuthenticated) {
    console.log("User not authenticated. Redirecting to login...");
    if (to.path !== '/') {
      return navigateTo('/')
    }

  }
});
