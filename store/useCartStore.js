// stores/useCartStore.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    showCartModal: false,
  }),
  getters: {
    itemCount: (state) => state.items.length,
    total: (state) =>
      state.items.reduce(
        (acc, item) => acc + item.prod_price * item.quantity,
        0
      ),
  },
  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--;
        } else {
          this.items.splice(index, 1);
        }
      }
    },
    clearCart() {
      this.items = [];
    },
    showCartModal() {
      this.showCartModal = true; // This action sets the state property
    },
    hideCartModal() {
      this.showCartModal = false;
    },
  },
});
