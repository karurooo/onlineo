<template>
  <div class="bg-black h-full w-full">
    <Navbar />

    <div class="items-center flex flex-col">
      <h1 class="text-6xl font-bold text-white">
        Welcome to the <span class="text-yellow-400">Onlineo</span>!
      </h1>
      <p class="text-[#F4EAE0] font-bold text-2xl">
        Your one stop shop for your best footware apparel
      </p>
    </div>
    <div class="lg:mt-10">
      <SearchBar />
      <Products_Display />
      <Products_Recent />
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "~/store/useProductStore";

const productStore = useProductStore();

onMounted(() => {
  productStore.displayAllProducts();
});
</script>
