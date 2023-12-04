<template>
  <div class="h-screen w-full text-white bg-black">
    <NavbarAuth />
    <div
      class="h-5/6 w-96 flex justify-center items-center border-2 rounded-lg m-10"
    >
      <div class="h-1/2 w-80 flex flex-col justify-center items-center">
        <h1 class="text-4xl font-bold">Welcome to your Seller Dashboard</h1>
        <h2 class="text-xl font-bold">What would you like to do?</h2>
        <div class="flex gap-4 mt-4">
          <button
            class="h-12 w-32 rounded-lg border-2 hover:bg-white hover:text-black"
            @click="ShowModal = true"
          >
            Add Product
          </button>
          <button
            class="h-12 w-32 rounded-lg border-2 hover:bg-white hover:text-black"
          >
            View Products
          </button>
        </div>
        <Listing_AddProduct
          :isVisible="ShowModal"
          @close-modal="ShowModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const ShowModal = ref(false);
</script>
