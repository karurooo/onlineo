<template>
  <div class="h-16 w-full relative text-white gap-3">
    <nav class="bg-[#191919] relative">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2"
      >
        <NuxtLink to="/dashboard">
          <h1 class="font-bold text-2xl sm:text-4xl">Onlineo</h1>
        </NuxtLink>
        <div class="flex md:order-2 relative">
          <button
            type="button"
            class="md:hidden text-gray-300 hover:bg-gray-600 rounded-lg text-sm p-2.5 me-1"
            @click="toggeleSearch"
            aria-label="Toggle mobile menu"
          >
            <icon name="material-symbols:search" size="24" />
          </button>

          <div class="relative hidden md:block">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <icon name="material-symbols:search" size="24" />
            </div>
            <input
              type="text"
              v-model="searchTerm"
              @keyup.enter="navigateToSearch"
              id="search-navbar"
              class="block w-full p-2 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-black"
              placeholder="Search..."
            />
          </div>
          <SearchBar v-if="ishidden" />
          <button
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-600"
            @click="toggleMobileMenu"
            aria-label="Toggle mobile menu"
          >
            <icon name="material-symbols:menu" size="24" />
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
          :class="{ hidden: !isMobileMenuOpen }"
        >
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-medium rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
          >
            <button
              class="h-12 w-12 rounded-full hover:scale-105 hover:bg-gray-800 shadow-md shadow-gray-600"
              v-for="button in buttons"
              :key="button"
            >
              <NuxtLink :to="button.link">
                <icon size="32" :name="button.icon" />
              </NuxtLink>
            </button>
            <button
              class="shadow-lg shadow-white h-10 w-20 border-2 rounded-lg hover:bg-gray-700 hover:text-white mx-5"
              @click="logout"
            >
              Logout
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
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/seller_dashboard">Seller Dashboard</a></li>
        <li><a href="/profile">Profile</a></li>
        <li @click="logout">Logout</li>
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
const buttons = [
  { icon: "material-symbols:dashboard", link: "/dashboard" },
  { icon: "material-symbols:shopping-cart-rounded", link: "/cart" },
  { icon: "material-symbols:sell-outline", link: "/seller_dashboard" },
  { icon: "material-symbols:person", link: "/profile" },
];

const logout = () => {
  authStore.logout();
  isMobileMenuOpen.value = false;
  console.log("logout");
};

const navigateToSearch = () => {
  if (searchTerm.value.trim()) {
    router.push({ path: "/search_results", query: { q: searchTerm.value } });
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
//create a function to toggle the search bar
const toggeleSearch = () => {
  ishidden.value = !ishidden.value;
};
</script>
