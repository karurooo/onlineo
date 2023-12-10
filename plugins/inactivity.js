// plugins/inactivity.js
import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const authStore = useAuthStore();
    const router = useRouter(); // Accessing the router instance
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        // Perform logout operation here
        authStore.logout();
        router.push("/login"); // Use the router instance to navigate
      }, 30 * 60 * 1000); // 30 minutes
    };

    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    // Add other events as necessary
  }
});
