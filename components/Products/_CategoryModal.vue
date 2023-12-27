<template>
  <div
    v-if="categoryStore.showModal"
    class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
    @click.self="categoryStore.hideModal()"
  >
    <!-- Modal content -->
    <div
      class="bg-[#343A40] rounded-lg h-5/6 w-11/12 py-24 px-5 overflow-auto relative"
      @click.stop
    >
      <h1 class="text-white text-2xl font-bold text-center mb-10">
        {{ categoryStore?.category?.category_name }}
      </h1>
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
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="product in categoryStore.products"
          :key="product.id"
          class="product-card rounded shadow-lg p-4 bg-[#007BFF] h-[350px] lg:h-[550px] lg:w-80 text-white relative"
          @click="showProductDetails(product)"
        >
          <nuxt-img
            :src="product.prod_image"
            :alt="product.prod_name"
            class="p-2 lg:p-8 rounded-t-lg shadow-inner shadow-gray-900"
          />

          <h3 class="text-white text-center lg:text-lg text-sm font-bold">
            {{ product.prod_name }}
          </h3>

          <div
            class="absolute bottom-2 right-2 lg:flex flex flex-col justify-between items-center mt-4 w-11/12"
          >
            <span class="text-xl font-bold"> ₱{{ product.prod_price }}</span>
            <button
              class="px-4 py-2 rounded bg-[#FD7E14] text-white hover:bg-[#E85D04]"
              @click="showProductDetails(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <Products_Modal
      v-if="productModalStore.showModal"
      :product="productModalStore.product"
      @close="productModalStore.hideModal"
    />
  </div>
</template>
<script setup>
import { useCategoryStore } from "~/store/useCategoryStore";
import { useProductModalStore } from "~/store/useModalStore";
import { useCartStore } from "~/store/useCartStore";

const cartStore = useCartStore();
const categoryStore = useCategoryStore();
const productModalStore = useProductModalStore();

function showProductDetails(product) {
  productModalStore.showProduct(product);
}
function addToCart(product) {
  cartStore.addToCart(product);
}
</script>
