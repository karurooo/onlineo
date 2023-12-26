<template>
  <div
    v-if="categoryStore.showModal"
    class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
    @click.self="categoryStore.hideModal()"
  >
    <!-- Modal content -->
    <div
      class="bg-[#343A40] rounded-lg h-5/6 w-11/12 p-10 pt-24 overflow-auto relative"
      @click.stop
    >
      <!-- Close button -->
      <div class="flex justify-end">
        <button
          class="h-10 w-10 shadow-lg shadow-black bg-[#007BFF] hover:bg-gray-700 rounded-full absolute right-5 top-5"
          @click="categoryStore.hideModal()"
        >
          <icon size="24" name="material-symbols:close-rounded" />
        </button>
      </div>
      <!-- Product List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="product in categoryStore.products"
          :key="product.id"
          class="product-card rounded shadow-lg p-4 bg-[#007BFF] h-[550px] w-80 text-white relative"
        >
          <nuxt-img
            :src="product.prod_image"
            :alt="product.prod_name"
            class="p-2 lg:p-8 rounded-t-lg shadow-inner shadow-gray-900"
          />

          <h3 class="text-white text-center text-lg font-bold">
            {{ product.prod_name }}
          </h3>

          <div
            class="absolute bottom-2 flex justify-between items-center mt-4 w-11/12"
          >
            <span class="text-xl font-bold"> ₱{{ product.prod_price }}</span>
            <button
              class="px-4 py-2 rounded bg-[#FD7E14] text-white hover:bg-blue-600"
              @click="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCategoryStore } from "~/store/useCategoryStore";

const categoryStore = useCategoryStore();
</script>
