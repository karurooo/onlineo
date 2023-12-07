<template>
  <div class="h-96 w-11/12 max-w-full flex rounded-lg">
    <Swiper
      :slides-per-view="4"
      :loop="true"
      :speed="600"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: true,
      }"
    >
      <SwiperSlide v-for="product in LatestProducts" :key="product.id">
        <div
          class="h-full w-96 bg-white text-black flex flex-col justify-center items-center hover:scale-105 translate-transform ease-in-out duration-500 mx-5"
          @click="showProductDetails(product)"
          cursor="pointer"
        >
          <nuxt-img
            :src="product.prod_image"
            alt=""
            class="h-52 w-52 object-cover border-2 shadow-lg rounded-lg m-2"
          />
          <p class="text-lg">{{ product.prod_name }}</p>

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

const productModalStore = useProductModalStore();
const cartStore = useCartStore();

function showProductDetails(product) {
  productModalStore.showProduct(product);
}
const addToCart = (product) => {
  cartStore.addToCart(product);
};

const { data: DisplayTopTen, error } = await useFetch(
  "http://project110.test/api/product"
);

const LatestProducts = ref([]);
if (!DisplayTopTen.value) {
  console.error(error.value);
}

watchEffect(() => {
  if (DisplayTopTen.value && DisplayTopTen.value.length > 0) {
    LatestProducts.value = DisplayTopTen.value
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 15);
  }
});
console.log(DisplayTopTen.value);
</script>
