<template>
  <div
    class="fixed inset-0 bg-black/60 text-black z-50 flex justify-center items-center px-4 overflow-auto"
    v-if="productModalStore.showModal"
  >
    <!-- Modal content -->
    <div
      class="bg-[#F4DFC8] rounded-lg shadow-xl shadow-gray-400 w-full lg:w-3/5 lg:h-3/4 relative mt-72 md:mt-10 sm:mt-96 flex justify-center items-center"
    >
      <button
        class="absolute top-7 lg:top-2 right-2 text-gray-400 hover:text-gray-300"
        @click="productModalStore.hideModal"
      >
        <icon name="material-symbols:cancel-outline-rounded" size="52" />
      </button>
      <div
        class="flex flex-col md:flex-row items-center justify-center p-4 gap-5"
      >
        <div
          class="w-full lg:w-3/4 overflow-hidden rounded-lg lg:block shadow-black shadow-lg"
        >
          <nuxt-img
            :src="productModalStore.product.prod_image"
            alt=""
            class="h-full w-full object-cover object-center"
          />
        </div>

        <div
          class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 md:grid lg:grid lg:max-w-4xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
        >
          <div
            class="lg:col-span-2 md:max-w-2xl lg:max-w-4xl lg:border-r lg:border-gray-200 lg:pr-8"
          >
            <h3
              class="text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl md:text-2xl sm:text-4xl"
            >
              {{ productModalStore.product.prod_name }}
            </h3>
            <div class="mt-4 lg:row-span-3 lg:mt-0">
              <p class="text-sm md:text-lg text-gray-400">
                {{ productModalStore.product.prod_description }}
              </p>
              <p class="text-3xl md:text-5xl font-bold my-4">
                ₱{{ productModalStore.product.prod_price }}
              </p>
            </div>
          </div>

          <div class="flex flex-col justify-center md:justify-start gap-2 my-4">
            <div class="flex">
              <button
                class="h-12 w-12 rounded-lg border-2 shadow-md shadow-black bg-[#F4EAE0] hover:bg-gray-700 hover:text-white"
                @click.stop="decreaseQuantity"
              >
                <icon name="ic:twotone-minus" size="32" />
              </button>
              <input
                class="bg-transparent shadow-md shadow-white"
                type="number"
                v-model.number="productModalStore.product.quantity"
              />
              <button
                class="h-12 w-12 rounded-lg border-2 shadow-md shadow-black bg-[#F4EAE0] hover:bg-gray-700 hover:text-white"
                @click.stop="increaseQuantity"
              >
                <icon name="material-symbols:add" size="32" />
              </button>
            </div>
            <div
              class="flex flex-row justify-center md:justify-start items-center gap-5"
            >
              <button
                class="h-12 w-32 rounded-lg border-2 shadow-lg shadow-black bg-[#FAF6F0] hover:scale-105 transition-transform ease-in-out duration-500 hover:bg-gray-700 hover:text-white"
                @click="addToCart(productModalStore.product)"
              >
                Add to Cart
              </button>
              <button
                class="h-12 w-32 rounded-lg border-2 shadow-lg shadow-black bg-[#FAF6F0] hover:scale-105 transition-transform ease-in-out duration-500 hover:bg-gray-700 hover:text-white"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductModalStore } from "~/store/useModalStore";
import { useCartStore } from "~/store/useCartStore";

const cartStore = useCartStore();
const productModalStore = useProductModalStore();

const addToCart = (product) => {
  // Update the product quantity if it's already in the cart
  cartStore.addToCart(product);
};

const increaseQuantity = () => {
  productModalStore.product.quantity = productModalStore.product.quantity + 1;
};

const decreaseQuantity = () => {
  if (productModalStore.product.quantity > 1) {
    productModalStore.product.quantity = productModalStore.product.quantity - 1;
  }
};
</script>
