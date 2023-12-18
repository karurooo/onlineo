<template>
  <div class="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
    <h3>Recent Products</h3>
    <div
      class="h-80 w-full max-w-screen-2xl min-w-0 rounded-lg items-center overflow-hidden"
    >
      <Swiper
        :slides-per-view="slidesPerView"
        :modules="[SwiperAutoplay, SwiperEffectCreative]"
        :loop="true"
        :speed="600"
        :autoplay="{ delay: 2000, disableOnInteraction: true }"
        :creative-effect="{
          prev: { shadow: false, translate: ['-20%', 0, -1] },
          next: { translate: ['100%', 0, 0] },
        }"
        class="w-full"
      >
        <SwiperSlide
          v-for="product in recentProducts"
          :key="product.id"
          class="flex flex-col items-center w-full sm:w-auto"
        >
          <div
            class="h-80 w-80 bg-[#F4DFC8] text-black flex flex-col justify-center items-center hover:scale-105 translate-transform ease-in-out duration-500 mx-5 p-2"
            @click="showProductDetails(product)"
            cursor="pointer"
          >
            <nuxt-img
              :src="product.prod_image"
              alt=""
              class="h-40 w-40 object-cover shadow-lg rounded-lg m-2"
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
      <!-- <Products_Modal
        v-if="productModalStore.showModal"
        :product="productModalStore.product"
        @close="productModalStore.hideModal"
      /> -->
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from "vue";
import { useProductStore } from "~/store/useProductStore";

const productStore = useProductStore();
const recentProducts = computed(() => productStore.recentProducts);

const slidesPerView = computed(() => {
  if (process.client) {
    const width = window.innerWidth;
    if (width < 640) {
      return 1;
    } else if (width >= 640 && width < 768) {
      return 2;
    } else if (width >= 768 && width < 1024) {
      return 3;
    } else if (width >= 1024 && width < 1280) {
      return 4;
    } else {
      return 5;
    }
  }
});

const updateSlidesPerView = () => {
  if (process.client) {
    slidesPerView.value = calculateSlidesPerView();
  }
};

const calculateSlidesPerView = () => {
  if (process.client) {
    const width = window.innerWidth;
    if (width < 640) {
      return 1;
    } else if (width >= 640 && width < 768) {
      return 2;
    } else if (width >= 768 && width < 1024) {
      return 3;
    } else if (width >= 1024 && width < 1280) {
      return 4;
    } else {
      return 5;
    }
  }
};

onMounted(() => {
  if (process.client) {
    window.addEventListener("resize", updateSlidesPerView);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", updateSlidesPerView);
  }
});
</script>
