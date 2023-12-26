<template>
  <div class="bg-black h-screen w-full text-white">
    <NavbarAuth />
    <section
      class="h-full w-full bg-black min-h-screen text-[#F4EAE0] relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h1 class="text-3xl font-bold mb-6 text-start">
        Search Results for "{{ searchTerm }}"
      </h1>
      <div
        v-if="products.length"
        class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="h-[450px] w-72 shadow-lg bg-[#007BFF] shadow-black rounded-lg border"
          @click="showProductDetails(product)"
        >
          <nuxt-img
            :src="product.prod_image"
            :alt="product.prod_name"
            class="p-2 lg:p-8 rounded-t-lg shadow-inner shadow-gray-900"
          />

          <h3 class="text-white text-center text-xl font-bold">
            {{ product.prod_name }}
          </h3>

          <div class="flex justify-evenly items-center my-2 gap-4">
            <span class="text-lg lg:text-lg text-white"
              >P{{ product.prod_price }}</span
            >
            <button
              class="bg-[#FD7E14] h-10 w-32 text-lg rounded-lg shadow-lg shadow-black text-center text-white hover:bg-[#E85D04]"
              @click="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <!-- End of product cards -->
      </div>
      <div v-else class="text-center">
        <p>No products found.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "~/store/useProductStore";

const route = useRoute();
const productStore = useProductStore();
const products = ref([]);
const searchTerm = ref(""); // Initialize searchTerm

onMounted(async () => {
  searchTerm.value = route.query.q; // Get the search term from the query parameter
  if (searchTerm.value) {
    await productStore.searchProducts(searchTerm.value);
    products.value = productStore.myProducts;
  }
});
</script>
