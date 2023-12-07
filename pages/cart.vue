<template>
  <div
    class="h-screen w-full inset-0 bg-black/90 text-white flex flex-col items-center gap-10"
  >
    <NavbarAuth />
    <div
      class="h-[700px] bg-black shadow-white shadow-lg p-6 rounded-lg max-w-full w-8/12"
    >
      <h2 class="text-xl font-bold mb-4">Your Cart</h2>

      <div class="flex flex-col p-5 relative">
        <ul>
          <li
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex justify-between items-center mb-2 w-full"
          >
            <nuxt-img :src="item.prod_image" class="h-20 w-20" />
            <p class="font-bold text-lg w-1/2">
              {{ item.prod_name }}
            </p>
            <p>{{ item.prod_price }}</p>

            <div class="flex items-center gap-3">
              <button
                class="h-8 w-8 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
                @click="decreaseQuantity(item)"
              >
                <icon name="ic:twotone-minus" size="24" />
              </button>

              <span class="mx-2">{{ item.quantity }}</span>
              <button
                class="h-8 w-8 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
                @click="increaseQuantity(item)"
              >
                <icon name="material-symbols:add" size="24" />
              </button>
            </div>
            <span>₱{{ item.prod_price * item.quantity }}</span>
            <button @click="removeFromCart(item.id)">Remove</button>
          </li>
        </ul>
        <div class="text-right mt-4 w-full">
          <strong class="text-4xl">Total: ₱{{ cartStore.total }}</strong>
        </div>
        <div class="mt-4 flex justify-end gap-2 w-full bb">
          <button
            class="h-10 w-52 bg-slate-500 rounded-xl hover:bg-white hover:text-black"
          >
            <NuxtLink to="/dashboard"> Continue Shopping </NuxtLink>
          </button>
          <button
            class="h-10 w-52 bg-slate-500 rounded-xl hover:bg-white hover:text-black"
            @click="proceedToCheckout"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~/store/useCartStore";

const cartStore = useCartStore();

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cartStore.removeFromCart(item.id);
  }
};

const increaseQuantity = (item) => {
  item.quantity++;
};

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId);
};

const closeCart = () => {
  cartStore.hideCartModal();
};

const proceedToCheckout = () => {
  // Logic to proceed to checkout
  // For example, redirect to a checkout page or open a checkout modal
};
</script>
