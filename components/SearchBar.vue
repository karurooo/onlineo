<template>
  <div
    class="flex flex-row sm:flex-row items-center gap-2 relative mt-6 max-w-lg mx-auto text-black px-8"
  >
    <input
      type="text"
      placeholder="Explore Products"
      v-model="searchTerm"
      @keyup.enter="navigateToSearch"
      class="w-2/3 lg:w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
    />
    <button
      class="h-12 w-36 rounded-lg shadow-lg shadow-black bg-[#007BFF] text-white"
      @click="navigateToSearch"
    >
      Search <icon name="ic:outline-search" />
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"; // Import useRouter

const router = useRouter(); // Get the router instance
const searchTerm = ref("");

const navigateToSearch = () => {
  if (searchTerm.value.trim()) {
    // Navigate to the search page with the search term as a query parameter
    router.push({ path: "/search_results", query: { q: searchTerm.value } });
  }
};
</script>
s
