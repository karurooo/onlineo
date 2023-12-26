<template>
  <div class="h-16 w-full relative text-white gap-3">
    <nav class="bg-black relative">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2"
      >
        <NuxtLink to="/dashboard">
          <h1 class="font-bold text-2xl sm:text-4xl">Onlineo</h1>
        </NuxtLink>

        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        >
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-medium rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 gap-6"
          >
            <button
              class="h-8 w-24 rounded-lg hover:scale-105 shadow-md shadow-black bg-[#FD7E14] hover:bg-[#E85D04]"
            >
              <NuxtLink to="/login">Login </NuxtLink>
            </button>
            <button
              class="h-8 w-24 rounded-lg hover:scale-105 hover:bg-gray-800 shadow-md shadow-black bg-[#007BFF]"
            >
              <NuxtLink to="/register">Register </NuxtLink>
            </button>
          </ul>
        </div>
      </div>
    </nav>
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden absolute top-full right-0 z-50 bg-white border border-gray-300 p-2 mt-2 rounded-lg text-black transition-transform duration-300"
    >
      <!-- Add your dropdown menu items here -->
      <ul>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/store/useAuthStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const searchTerm = ref("");
const isMobileMenuOpen = ref(false);

const navigateToSearch = () => {
  if (searchTerm.value.trim()) {
    router.push({ path: "/search_results", query: { q: searchTerm.value } });
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>
