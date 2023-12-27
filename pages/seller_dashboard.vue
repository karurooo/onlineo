<template>
  <div class="h-full w-full text-white bg-black overflow-hidden relative">
    <NavbarAuth />
    <div class="py-6 px-5">
      <div class="flex justify-around items-center">
        <h2 class="text-2xl md:text-4xl font-semibold mb-6">Your Products</h2>
        <div class="flex gap-5">
          <button
            class="h-12 w-32 bg-[#007BFF] shadow-lg shadow-black rounded-lg"
            @click="modals.addProduct.showModal"
          >
            Add Products
          </button>
          <button
            class="h-12 w-32 bg-[#FD7E14] hover:bg-[#E85D04] shadow-lg shadow-black rounded-lg"
            @click="openAddCategoryModal"
          >
            Add Category
          </button>
        </div>
      </div>
      <Listing_MyProducts />
    </div>

    <Listing_AddProduct
      :isVisible="modals.addProduct.isModalVisible.value"
      @close="modals.addProduct.hideModal"
    />
    <ListingAddCategory
      :isVisible="modals.addCategory.isModalVisible.value"
      @close="modals.addCategory.hideModal"
    />
  </div>
</template>

<script setup>
import { useModal } from "~/composables/useModal";

const modals = {
  addProduct: useModal(),
  addCategory: useModal(),
};
function openAddCategoryModal() {
  modals.addCategory.showModal();
}
</script>
