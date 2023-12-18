// stores/useProductModalStore.js
import { defineStore } from "pinia";
import { getToken } from "~/utils/token";

export const useProductModalStore = defineStore("productModal", {
  state: () => ({
    product: null, // This will hold the currently selected product
    showModal: false,
    quantity: 1,
  }),
  actions: {
    initalizeAuth() {
      const { token, userId } = getToken();
      this.userId = userId;
      this.Token = token;
    },

    showProduct(product) {
      this.product = { ...product, quantity: 1 };
      this.showModal = true;
    },
    hideModal() {
      this.product = null;
      this.showModal = false;
    },
  },
});
