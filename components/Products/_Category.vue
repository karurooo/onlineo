<template>
  <div
    class="h-[650px] w-full flex flex-col justify-center bg-[#343A40] gap-10 px-8 lg:px-48"
  >
    <h1 class="text-white text-4xl my-">Footwear Categories</h1>
    <Swiper
      slides-per-view="5"
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
        v-for="category in allCategories"
        :key="category.id"
        class="flex flex-col items-center w-full sm:w-auto"
      >
        <div
          class="h-96 w-72 shadow-lg bg-[#007BFF] shadow-black rounded-lg border"
        >
          <nuxt-img
            :src="category.image_url"
            :alt="category.category_name"
            class="p-2 lg:p-8 rounded-t-lg shadow-inner shadow-gray-900"
          />
          <p class="text-white text-center text-2xl font-bold">
            {{ category.category_name }}
          </p>

          <div class="flex justify-center">
            <Button
              @click="showCategoryProducts(category.products)"
              class="bg-[#FD7E14] h-10 w-48 text-xl rounded-lg shadow-lg shadow-black text-center text-white hover:bg-[#E85D04] flex items-center justify-center"
            >
              Explore
            </Button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <Products_CategoryModal
      :is-active="categoryStore.showModal"
      :product="categoryStore.product"
      @close="categoryStore.hideModal()"
    />
  </div>
</template>

<script setup>
import { useCategoryStore } from "~/store/useCategoryStore";
import { useRouter } from "vue-router";

const categoryStore = useCategoryStore();
const allCategories = ref([]);
const router = useRouter();

onMounted(async () => {
  await categoryStore.fetchAllCategories().then((category) => {
    allCategories.value = category;
  });
});

function showCategoryProducts(products) {
  categoryStore.showProducts(products);
}
</script>
