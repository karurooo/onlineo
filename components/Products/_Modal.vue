<template>
  <div
    class="fixed inset-0 bg-black/60 text-white z-50 flex justify-center items-center px-4 overflow-auto"
    v-if="productModalStore.showModal"
  >
    <!-- Modal content -->
    <div
      class="bg-[#007BFF] rounded-lg shadow-xl shadow-gray-400 w-full lg:w-3/5 lg:h-3/4 relative mt-72 md:mt-10 sm:mt-96 flex justify-center items-center"
    >
      <button
        class="h-10 w-10 shadow-lg shadow-black bg-[#007BFF] hover:bg-gray-700 rounded-full absolute right-5 top-5"
        @click="productModalStore.hideModal"
      >
        <icon size="24" name="material-symbols:close-rounded" />
      </button>
      <div
        class="flex flex-col md:flex-row items-center justify-center p-4 gap-5 mt-16 lg:mt-0"
      >
        <div class="w-3/5 lg:w-2/3 overflow-hidden rounded-lg lg:block">
          <nuxt-img
            :src="productModalStore.product.prod_image"
            alt=""
            class="p-2 lg:p-8 rounded-t-lg shadow-inner shadow-gray-900"
          />
        </div>

        <div
          class="mx-auto px-4 pb-16 pt-10 sm:px-6 md:grid lg:grid lg:max-w-4xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
        >
          <div
            class="lg:col-span-2 md:max-w-2xl lg:max-w-4xl lg:border-r lg:border-gray-200 lg:pr-8 relative h-auto w-80 mx-20"
          >
            <h3
              class="text-xl font-bold text-white text-center lg:text-3xl md:text-2xl"
            >
              {{ productModalStore.product.prod_name }}
            </h3>
            <div class="mt-4 lg:row-span-3 lg:mt-0">
              <p class="text-sm md:text-lg text-[#f1f1f1] text-justify">
                <span class="font-bold"> Description:</span>
                {{ productModalStore.product.prod_description }}
              </p>
            </div>
          </div>

          <div
            class="flex flex-col justify-center md:justify-start gap-2 my-4 w-[400px]"
          >
            <div
              class="flex gap-4 items-center xs:justify-center w-11/12 pl-10"
            >
              <p class="text-xl lg:text-3xl md:text-5xl font-bold my-4 mx-auto">
                ₱{{ productModalStore.product.prod_price }}
              </p>
              <div class="flex items-center justify-center gap-2">
                <button
                  class="lg:h-12 lg:w-12 h-8 w-8 rounded-lg border-2 lg:p-2 shadow-md shadow-black bg-[#FD7E14] hover:bg-gray-700 hover:text-white"
                  @click.stop="decreaseQuantity"
                >
                  <icon name="ic:twotone-minus" size="24" />
                </button>
                <input
                  class="w-16 text-center bg-transparent shadow-lg rounded-lg shadow-black"
                  type="number"
                  v-model.number="productModalStore.product.quantity"
                />
                <button
                  class="lg:h-12 lg:w-12 h-8 w-8 rounded-lg border-2 lg:p-2 shadow-md shadow-black bg-[#FD7E14] hover:bg-gray-700 hover:text-white"
                  @click.stop="increaseQuantity"
                >
                  <icon name="material-symbols:add" size="24" />
                </button>
              </div>
            </div>
            <div
              class="flex justify-center md:justify-start items-center gap-5 w-11/12 pl-24"
            >
              <button
                class="h-12 w-32 rounded-lg border-2 shadow-lg mx-auto shadow-black bg-[#FD7E14] hover:scale-105 transition-transform ease-in-out duration-500 hover:bg-gray-700 hover:text-white"
                @click="addToCart(productModalStore.product)"
              >
                Add to Cart
              </button>
              <button
                class="h-12 w-32 rounded-lg border-2 shadow-lg mx-auto shadow-black bg-[#FD7E14] hover:scale-105 transition-transform ease-in-out duration-500 hover:bg-gray-700 hover:text-white"
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
