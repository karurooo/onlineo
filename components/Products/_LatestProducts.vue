<template>
  <div class="h-80 w-11/12 max-w-full flex rounded-lg items-center">
    <Swiper
      :slides-per-view="5"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :loop="true"
      :speed="600"
      :autoplay="{ delay: 8000, disableOnInteraction: true }"
      :creative-effect="{
        prev: { shadow: false, translate: ['-20%', 0, -1] },
        next: { translate: ['100%', 0, 0] },
      }"
    >
      <SwiperSlide
        v-for="product in LatestProducts"
        :key="product.id"
        class="flex flex-col items-center w-full sm:w-auto"
      >
        <div
          class="h-80 w-80 bg-orange-500 text-black flex flex-col justify-center items-center hover:scale-105 translate-transform ease-in-out duration-500 mx-5 p-2"
          @click="showProductDetails(product)"
          cursor="pointer"
        >
          <nuxt-img
            :src="product.prod_image"
            alt=""
            class="h-40 w-40 object-cover border-2 shadow-lg rounded-lg m-2"
          />
          <p class="text-lg text-center">{{ product.prod_name }}</p>
          <p class="text-lg">₱{{ product.prod_price }}</p>
          <div class="flex gap-3">
            <button
              class="h-12 w-32 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
              @click.stop="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <Products_Modal
      v-if="productModalStore.showModal"
      :product="productModalStore.product"
      @close="productModalStore.hideModal"
    />
  </div>
</template>

<script setup>
import { useProductModalStore } from "~/store/useModalStore";
import { useCartStore } from "~/store/useCartStore";
import { useProductStore } from "~/store/useProductStore";

const productModalStore = useProductModalStore();
const cartStore = useCartStore();
const productStore = useProductStore();

onMounted(async () => {
  await productStore.displayAllProducts();
});

// Computed property to get the latest 10 products
const LatestProducts = computed(() => {
  return productStore.allProducts
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10);
});

// Function to show product details
function showProductDetails(product) {
  productModalStore.showProduct(product);
}

// Function to add product to cart
const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>
