// stores/useProductModalStore.js
import { defineStore } from "pinia";

export const useProductModalStore = defineStore("productModal", {
  state: () => ({
    product: null, // This will hold the currently selected product
    showModal: false,
    quantity: 1,
  }),
  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        this.items.push(product);
      }
    },
    showProduct(product) {
      this.product = product;
      this.showModal = true;
    },
    hideModal() {
      this.product = null;
      this.showModal = false;
    },
  },
});
