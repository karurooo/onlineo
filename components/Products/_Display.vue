<template>
  <div
    class="h-full w-full bg-black min-h-screen text-[#F4EAE0] relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
  >
    <h1 class="text-3xl md:text-4xl font-bold self-start mx-20 my-10">
      All Products
    </h1>

    <div v-if="productStore.isLoadingAllProducts">
      <Products_Skeleton />
    </div>

    <div v-else-if="allProducts.length === 0" class="no-products">
      No products found.
    </div>

    <div
      v-else
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      <div
        v-for="product in allProducts"
        :key="product.id"
        class="w-full max-w-sm bg-[#F4DFC8] rounded-lg hover:cursor-pointer hover:scale-105 translate-transform ease-in-out duration-500"
        @click="showProductDetails(product)"
      >
        <nuxt-img
          :src="product.prod_image"
          :alt="product.prod_name"
          class="p-8 rounded-t-lg"
        />
        <div class="px-5 pb-5 relative">
          <div class="absolute bottom-16 -right-4 flex h-16 w-full py-3">
            <h3 class="text-xl font-semibold tracking-tight text-gray-900">
              {{ product.prod_name }}
            </h3>
          </div>

          <div
            class="flex items-center justify-between gap-6 absolute bottom-0 my-3"
          >
            <p class="mt-1 text-lg font-medium text-gray-900">
              P{{ product.prod_price }}
            </p>

            <button
              class="w-32 self-center items-center text-md p-2 bg-black rounded-lg shadow-md shadow-gray-500"
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
