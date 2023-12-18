<template>
  <div class="flex flex-col h-screen w-full bg-black text-white">
    <NavbarAuth />

    <!-- Main container for the cart -->
    <div
      class="h-full w-full bg-[#F4EAE0] min-h-screen text-[#F4EAE0] relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-4xl font-bold mb-4 text-black">Your Cart</h2>
      <ul class="space-y-4">
        <li
          v-for="item in myCart"
          :key="item.id"
          class="flex justify-between items-center bg-[#F4DFC8] text-black p-2 rounded-lg shadow-md shadow-black"
        >
          <nuxt-img :src="item?.product?.prod_image" class="h-20 w-20" />
          <p class="font-bold text-lg w-1/2 truncate">
            {{ item?.product?.prod_name }}
          </p>
          <strong class="text-2xl">Total: ₱{{ cartTotal }}</strong>

          <div class="flex items-center gap-3">
            <button
              class="h-8 w-8 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
              @click="decreaseQuantity(item)"
            >
              <!-- Icon component -->
              <icon name="ic:twotone-minus" size="20" />
            </button>

            <span class="mx-2">{{ item?.quantity }}</span>
            <button
              class="h-8 w-8 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
              @click="increaseQuantity(item)"
            >
              <icon name="material-symbols:add" size="20" />
            </button>
          </div>
          <span>₱{{ item?.product?.prod_price * item?.quantity }}</span>
          <button
            class="shadow-lg shadow-gray-400 h-10 w-24 border-2 rounded-lg hover:bg-white hover:text-black"
            @click="deleteFromCart(item)"
          >
            Remove
          </button>
        </li>
      </ul>
    </div>

    <!-- Fixed total section -->
    <div class="fixed inset-x-0 bottom-0 bg-black p-4 shadow-lg text-white">
      <div class="max-w-3xl mx-auto flex justify-between items-center w-full">
        <strong class="text-2xl">Total: ₱{{ cartStore.total }}</strong>
        <div class="flex gap-2">
          <button
            class="h-10 w-48 shadow-lg shadow-gray-400 rounded-xl hover:bg-white hover:text-black"
          >
            <NuxtLink to="/dashboard">Continue Shopping</NuxtLink>
          </button>
          <button
            class="h-10 w-32 shadow-lg shadow-gray-400 rounded-xl text-white hover:bg-white hover:text-black bg-blue"
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
import { usePaymentStore } from "~/store/usePaymentStore";
import { onMounted } from "vue";
import { getToken } from "../utils/token";

const cartStore = useCartStore();
const paymentStore = usePaymentStore();
const userId = getToken();

const myCart = ref([]);
const cartTotal = computed(() => cartStore.total);

onMounted(async () => {
  try {
    myCart.value = await cartStore.fetchCart();
    console.log("Cart:", myCart.value);
  } catch (error) {
    console.error("There was an error fetching the cart:", error);
  }
});
const increaseQuantity = async (item) => {
  item.quantity++;
  await cartStore.updateCart(item);
};

const decreaseQuantity = async (item) => {
  if (item.quantity > 1) {
    item.quantity--;
    await cartStore.updateCart(item);
  }
};

const deleteFromCart = async (item) => {
  try {
    await cartStore.removeFromCart(item.id);
    // Update the local cart to reflect the change
    myCart.value = myCart.value.filter((cartItem) => cartItem.id !== item.id);
  } catch (error) {
    console.error("Error deleting item from cart:", error);
  }
};

const closeCart = () => {
  cartStore.hideCartModal();
};

// Proceed to checkout method
// Proceed to checkout method
// Proceed to checkout method
const proceedToCheckout = async () => {
  try {
    await paymentStore.checkout(userId.userId); // Make sure you're passing the actual user ID, not the entire object
    if (paymentStore.checkoutUrl) {
      window.location.href = paymentStore.checkoutUrl;
    } else {
      console.error("Checkout URL not found");
    }
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};
</script>
