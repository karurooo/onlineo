import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    currentProduct: null,
  }),
  actions: {
    async fetchProduct(id) {
      try {
        const response = await useFetch(
          `http://project110.test/api/product/${id}`
        );
        this.currentProduct = response.data;
      } catch (error) {
        console.error("There was an error fetching the product:", error);
      }
    },
  },
});
