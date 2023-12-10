import { defineStore } from "pinia";
import { useAuthStore } from "~/store/useAuthStore";

export const useProductStore = defineStore("product", {
  state: () => ({
    myProducts: [],
  }),
  actions: {
    async fetchMyProducts() {
      const authStore = useAuthStore();
      if (!authStore.user) {
        console.error("User not authenticated.");
        return;
      }

      try {
        const response = await fetch(
          `http://project110.test/api/products?user_id=${authStore.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${authStore.token}`, // Sending the auth token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        this.myProducts = data; // Assuming the API returns the array of products directly
      } catch (error) {
        console.error("There was an error fetching the products:", error);
        this.myProducts = [];
      }
    },
    async deleteProduct(productId) {
      const authStore = useAuthStore();
      if (!authStore.user) {
        console.error("User not authenticated.");
        return;
      }

      try {
        const response = await fetch(
          `http://project110.test/api/product/${productId}`, // Update URL to your DELETE endpoint
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${authStore.token}`, // Sending the auth token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }

        // Update the local products array to remove the deleted product
        this.myProducts = this.myProducts.filter(
          (product) => product.id !== productId
        );
      } catch (error) {
        console.error("There was an error deleting the product:", error);
      }
    },
  },
});
