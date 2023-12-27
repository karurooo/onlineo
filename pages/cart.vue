<template>
  <div class="h-full w-full bg-black text-white">
    <NavbarAuth />
    <div class="flex flex-col lg:flex-row">
      <!-- Main container for the cart -->
      <div
        class="h-screen w-full bg-[#161212] text-[#F4EAE0] relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <h2 class="text-4xl font-bold mb-4 text-black">Your Cart</h2>
        <ul class="space-y-4">
          <li
            v-for="item in myCart"
            :key="item.id"
            class="lg:h-72 h-[550px] w-full flex lg:flex-row flex-col text-white bg-[#007BFF] rounded-lg shadow-lg justify-center items-center gap-6"
          >
            <nuxt-img
              :src="item?.product?.prod_image"
              class="lg:h-60 lg:w-60 h-36 w-36 lg:mt-0 mt-72 m-4 object-cover"
            />
            <!--div details-->
            <div
              class="w-full flex lg:flex-row flex-col justify-between m-6 px-10 relative"
            >
              <div class="flex flex-col gap-6">
                <p class="font-bold text-lg">
                  {{ item?.product?.prod_name }}
                </p>
                <p class="w-3/4">
                  {{ item?.product?.prod_description }}
                </p>
                <p class="text-sm">
                  Category: {{ getCategoryNameById(item.product.category_id) }}
                </p>

                <!--Price and Remove Button-->
                <div class="flex items-center gap-6">
                  <p>₱{{ item?.product?.prod_price }}</p>
                  <div class="flex flex-col lg:flex">
                    <button
                      class="bg-[#FD7E14] hover:bg-[#E85D04] shadow-lg shadow-black h-8 w-12 lg:h-10 lg:w-24 rounded-lg text-[10px] lg:text-base"
                      @click="deleteFromCart(item)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex flex-col justify-between items-center py-3">
                <!--Quantity Component-->
                <div class="w-36 flex justify-between items-center lg:gap-3">
                  <button
                    class="bg-[#FD7E14] hover:bg-[#E85D04] lg:h-8 lg:w-8 rounded-lg shadow-lg shadow-black hover:text-white"
                    @click="decreaseQuantity(item)"
                  >
                    <!-- Icon component -->
                    <icon name="ic:twotone-minus" size="20" />
                  </button>

                  <span class="mx-2">{{ item?.quantity }}</span>
                  <button
                    class="bg-[#FD7E14] hover:bg-[#E85D04] h-8 w-8 rounded-lg shadow-lg shadow-black hover:text-white"
                    @click="increaseQuantity(item)"
                  >
                    <icon name="material-symbols:add" size="20" />
                  </button>
                </div>
                <strong class="text-xl"
                  >Total: ₱{{
                    item?.product?.prod_price * item?.quantity
                  }}</strong
                >
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Fixed total section -->
      <div class="bg-[#343A40] p-4 shadow-lg text-white">
        <div class="max-w-3xl mx-auto flex justify-between items-center w-full">
          <strong class="text-2xl"
            >Total: ₱{{ cartStore.total.toFixed(2) }}</strong
          >
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
const myCart = computed(() => cartStore.items);
const cartTotal = computed(() => cartStore.total);
console.log("Reactive cart total:", cartTotal.value);

onMounted(async () => {
  try {
    await cartStore.fetchCart();
  } catch (error) {
    console.error("There was an error fetching the cart:", error);
  }
});

const increaseQuantity = (item) => {
  item.quantity++;
  updateCartAndFetch(item);
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
    updateCartAndFetch(item);
  }
};

const deleteFromCart = async (item) => {
  try {
    await cartStore.removeFromCart(item.id);
    // Re-fetch cart to update the items and the total
    await cartStore.fetchCart();
  } catch (error) {
    console.error("Error deleting item from cart:", error);
  }
};

const updateCartAndFetch = async (item) => {
  try {
    await cartStore.updateCart(item);
    // Re-fetch cart to update the items and the total
    await cartStore.fetchCart();
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};
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

// Add this computed property to get the category names
const getCategoryNameById = cartStore.getCategoryNameById;
</script>
