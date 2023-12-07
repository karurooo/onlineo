<template>
  <div
    class="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
    v-if="productModalStore.showModal"
  >
    <!-- Modal content -->
    <div
      class="h-full w-full flex flex-col md:flex-row items-center justify-center relative"
    >
      <button
        class="absolute top-0 right-0 m-5 hover:scale-105 transition-transform duration-300 ease-in-out"
        @click="productModalStore.hideModal"
      >
        <icon name="material-symbols:cancel-outline-rounded" size="52" />
      </button>
      <div class="md:w-1/2 flex justify-center">
        <nuxt-img
          :src="productModalStore.product.prod_image"
          alt=""
          class="h-[500px] w-[500px] object-cover rounded-2xl shadow-2xl"
        />
      </div>
      <div
        class="h-full md:w-1/2 p-4 flex flex-col justify-center items-start gap-10"
      >
        <h3 class="text-3xl">
          <span class="font-bold">Product Name:</span>
          {{ productModalStore.product.prod_name }}
        </h3>
        <p class="text-xl">
          <span class="font-bold">Description: </span>

          {{ productModalStore.product.prod_description }}
        </p>
        <p class="text-5xl font-bold">
          Price: ₱{{ productModalStore.product.prod_price }}
        </p>
        <div class="flex gap-3">
          <button
            class="h-12 w-12 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
            @click.stop="decreaseQuantity"
          >
            <icon name="ic:twotone-minus" size="32" />
          </button>
          <input
            class="bg-transparent text-white shadow-md shadow-white"
            type="number"
            v-model.number="productModalStore.product.quantity"
          />
          <button
            class="h-12 w-12 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
            @click.stop="increaseQuantity"
          >
            <icon name="material-symbols:add" size="32" />
          </button>
        </div>
        <div class="flex gap-3 justify-center">
          <button
            class="h-12 w-32 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
            @click.stop="addToCart(productModalStore.product)"
          >
            Add to Cart
          </button>
          <button
            class="h-12 w-32 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
            @click.stop="addToCart(product)"
          >
            Buy Now
          </button>
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
  const existingItem = cartStore.items.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    // Add the product with its quantity to the cart
    cartStore.addToCart({ ...product, quantity: product.quantity });
  }
};
const increaseQuantity = () => {
  productModalStore.product.quantity++;
  console.log("button clicked");
};

const decreaseQuantity = () => {
  if (productModalStore.product.quantity > 1) {
    productModalStore.product.quantity--;
  }
};
</script>
