<template>
  <div class="h-screen w-full text-white bg-black overflow-hidden relative">
    <NavbarAuth />
    <div class="mt-24 py-6 px-5">
      <div class="flex">
        <h2 class="text-4xl font-semibold mb-6">Your Products</h2>
        <button
          class="h-12 w-32 rounded-lg border-2 hover:bg-white hover:text-black ml-5"
          @click="modals.addProduct.showModal"
        >
          Add Products
        </button>
      </div>
      <Listing_MyProducts />
    </div>

    <Listing_AddProduct
      :isVisible="modals.addProduct.isModalVisible.value"
      @close="modals.addProduct.hideModal"
    />
  </div>
</template>

<script setup>
import { useModal } from "~/composables/useModal";

const modals = {
  addProduct: useModal(),
};
</script>
