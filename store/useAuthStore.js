// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    sessionCheckIntervalId: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    initialize() {
      this.loadFromLocalStorage();
    },
    saveToken(token) {
      this.token = token;
      localStorage.setItem("userToken", token);
    },
    saveUser(user) {
      this.user = user;
      localStorage.setItem("userId", user.id);
    },
    async login(credentials) {
      try {
        const response = await fetch("http://project110.test/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Accept: "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error("Login failed");

        const data = await response.json();
        this.saveToken(data.token);
        this.saveUser(data.user);

        // Start the session check
        this.startSessionCheck();
      } catch (error) {
        console.error("Login Error:", error);
      }
    },
    async register(userInfo) {
      try {
        const response = await fetch("http://project110.test/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(userInfo),
        });

        if (!response.ok) throw new Error("Registration failed");
      } catch (error) {
        console.error("Registration Error:", error);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      if (process.client) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
      }
      this.stopSessionCheck();

      navigateTo("/");
    },
    loadFromLocalStorage() {
      const token = localStorage.getItem("userToken");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        this.token = token;
        this.user = { id: userId }; // You should fetch the complete user info
      }
    },
    startSessionCheck() {
      this.stopSessionCheck(); // Clear any existing timers
      this.sessionCheckIntervalId = setInterval(
        this.checkSession,
        10 * 60 * 1000
      ); // every 5 minutes
    },
    stopSessionCheck() {
      if (this.sessionCheckIntervalId) {
        clearInterval(this.sessionCheckIntervalId);
        this.sessionCheckIntervalId = null;
      }
    },
    async checkSession() {
      try {
        const response = await fetch(
          "http://project110.test/api/check-session",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Session expired");
        // If the response is OK, the session is still active.
      } catch (error) {
        // If the session is expired or there's an error, log the user out
        this.logout();
      }
    },
  },
});
