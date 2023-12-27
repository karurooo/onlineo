<template>
  <div
    class="h-full w-full min-h-screen text-[#F4EAE0] relative mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 my-10 rounded-lg shadow-lg shadow-black"
  >
    <h1 class="text-3xl md:text-4xl font-bold self-start mb-10">
      All Products
    </h1>

    <div v-if="productStore.isLoadingAllProducts">
      <Skeleton_AllProducts />
    </div>

    <div v-else-if="allProducts.length === 0" class="no-products">
      No products found.
    </div>

    <div
      v-else
      class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8"
    >
      <div
        v-for="product in allProducts"
        :key="product.id"
        class="w-full max-w-sm bg-[#007BFF] text-white rounded-lg hover:cursor-pointer hover:scale-105 translate-transform ease-in-out duration-500 border"
        @click="showProductDetails(product)"
      >
        <nuxt-img
          :src="product.prod_image"
          :alt="product.prod_name"
          class="p-2 lg:p-8 rounded-t-lg shadow-inner shadow-gray-900"
        />
        <div class="px-5 pb-5 relative">
          <div class="flex h-20 w-full py-3">
            <h3 class="text-sm lg:text-lg truncate font-semibold">
              {{ product.prod_name }}
            </h3>
          </div>

          <div class="flex items-center justify-between gap-2">
            <p class="text-xs lg:text-lg font-medium">
              P{{ product.prod_price }}
            </p>

            <button
              class="self-center items-center text-[8px] lg:text-sm h-10 w-32 bg-[#FD7E14] hover:bg-[#E85D04] rounded-lg shadow-lg shadow-black"
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
import { onMounted } from "vue";
import { useProductStore } from "~/store/useProductStore";
import { useProductModalStore } from "~/store/useModalStore";

const productStore = useProductStore();

const productModalStore = useProductModalStore();
const allProducts = ref([]);

onMounted(async () => {
  await productStore.displayAllProducts().then((products) => {
    allProducts.value = products;
  });
});

function showProductDetails(product) {
  productModalStore.showProduct(product);
}
</script>
