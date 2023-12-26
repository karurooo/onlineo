// middleware/authenticated.js
import { useAuthStore } from "~/store/useAuthStore";
import { useNotification } from '../composables/useNotifications';

const { notify } = useNotification();

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const protectedRoutes = ['/dashboard', '/cart', '/seller_dashboard'];

  // Check if the route is protected and the user is not authenticated
  if (protectedRoutes.includes(to.path) && !authStore.isAuthenticated) {
    // Notify user
    notify({
      title: "Error",
      text: "You are not authorized to access this page",
      icon: "error",
      confirmButtonText: "OK"
    });

    // Redirect to home page
    return navigateTo('/');
  } else if (authStore.isAuthenticated) {
    // If the user is authenticated, redirect to the dashboard
    return navigateTo('/dashboard');
  }

  // No need for an else if or else here, just let the middleware end if the conditions are not met.
  // This allows the navigation to continue naturally for authenticated users trying to access protected routes.
});
