<template>
  <div class="h-16 w-full bg-black shadow-lg shadow-gray-500">
    <nav class="bg-transparent">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2"
      >
        <NuxtLink to="/dashboard">
          <h1 class="font-bold text-2xl sm:text-4xl text-white">Onlineo</h1>
        </NuxtLink>
        <div class="flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            class="md:hidden text-gray-300 hover:bg-gray-600 rounded-lg text-sm p-2.5 me-1"
          >
            <icon name="material-symbols:search" size="24" />
            <span class="sr-only">Search</span>
          </button>
          <div class="relative hidden md:block">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <icon name="material-symbols:search" size="24" />
              <span class="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-black"
              placeholder="Search..."
            />
          </div>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <icon name="material-symbols:menu" size="24" />
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div class="relative mt-3 md:hidden">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            ></div>
            <input
              type="text"
              id="search-navbar"
              class="block w-full p-2 ps-10 text-sm text-gray-900"
              placeholder="Search..."
            />
          </div>

          <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
          >
            <button
              class="h-12 w-12 rounded-full hover:scale-105 hover:bg-gray-800 shadow-md shadow-gray-600"
              v-for="button in buttons"
              :key="button"
              @click="
                button.icon === 'material-symbols:shopping-cart-rounded'
                  ? openCart()
                  : null
              "
            >
              <NuxtLink :to="button.link">
                <icon size="32" :name="button.icon" />
              </NuxtLink>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/useAuthStore";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  if (logout) {
    $router.push("/");
    console.log("logout");
  }
};
const buttons = [
  { icon: "material-symbols:dashboard", link: "/dashboard" },
  { icon: "material-symbols:shopping-cart-rounded", link: "/cart" },
  { icon: "material-symbols:sell-outline", link: "/seller_dashboard" },
  { icon: "material-symbols:person", link: "/profile" },
];
</script>
