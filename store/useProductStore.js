import { defineStore } from "pinia";
import { useAuthStore } from "~/store/useAuthStore";

export const useProductStore = defineStore("product", {
  state: () => ({
    myProducts: [],
    searchTerm: "",
    selectedCategory: null,
    allProducts: [],
    isLoadingAllProducts: false,
    allProductsError: null,
  }),
  getters: {
    // Getter to get the top 5 recent products
    recentProducts: (state) => {
      return [...state.allProducts] // Copy the array to prevent mutating the original array
        .sort((a, b) => {
          // Replace 'createdAt' with the appropriate field name
          return new Date(b.created_at) - new Date(a.created_at);
        })
        .slice(0, 10); // Get the first 5 elements
    },
  },
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
    async searchProducts(searchTerm) {
      this.isLoadingAllProducts = true;
      try {
        const response = await fetch(
          `http://project110.test/api/products/search/${searchTerm}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              // Add authorization header if needed
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to search products");
        }

        const data = await response.json();
        this.myProducts = data; // Assuming the API returns the array of products directly
      } catch (error) {
        console.error("There was an error in the search:", error);
        this.myProducts = [];
        this.isLoadingAllProducts = false;
      }
    },
    async displayAllProducts() {
      this.isLoadingAllProducts = true;
      this.allProductsError = null;

      try {
        const response = await fetch("http://project110.test/api/product", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch all products");
        }

        const data = await response.json();
        this.allProducts = data; // Assuming the API returns the array of products directly
        return data; // Assuming the API returns the array of products directly
      } catch (error) {
        console.error("There was an error fetching the products:", error);
        this.allProductsError = error;
      } finally {
        this.isLoadingAllProducts = false;
      }
    },

    async categoryProducts(categoryId) {
      this.isLoadingAllProducts = true;
      this.allProductsError = null;

      try {
        const response = await fetch(
          `http://project110.test/api/products/category/${categoryId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch all products");
        }

        const data = await response.json();
        return data; // Assuming the API returns the array of products directly
      } catch (error) {
        console.error("There was an error fetching the products:", error);
        this.allProductsError = error;
      } finally {
        this.isLoadingAllProducts = false;
      }
    },
  },
});
