import { defineStore } from "pinia";
import { useNotification } from "~/composables/useNotifications";
import { getToken } from "~/utils/token";

const { notify } = useNotification();

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    total: 0, // Add this line to hold the total from the backend
    showCartModal: false,
    ProductCategory: [
      { id: 1, name: "Casual" },
      { id: 2, name: "Formal" },
      { id: 3, name: "Sneakers" },
      { id: 4, name: "Boots" },
      { id: 5, name: "Sandals" },
      { id: 6, name: "Running" },
      { id: 7, name: "Basketball" },
      { id: 8, name: "Cricket" },
      { id: 9, name: "Soccer" },
      { id: 10, name: "Tennis" },
    ],
  }),

  actions: {
    initializeStore() {
      const { token, userId } = getToken();
      if (token && userId) {
        this.Token = token.trim(); // Trim the token to remove any whitespace or newline characters
        this.userId = userId; // Fetch cart items upon initializing the store

        console.log("Token: ", this.Token);
        console.log("User ID: ", this.userId);
      } else {
        notify({
          title: "Authentication Error",
          text: "Please log in to view your cart.",
          icon: "error",
        });
      }
    },

    async addToCart(product) {
      const { userId, token } = getToken();
      let existingItem = this.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        existingItem = { ...product, quantity: 1 };
        this.items.push(existingItem);
      }
      // console.log(existingItem);
      console.log(token);
      const id = JSON.parse(userId);
      try {
        const response = await fetch("http://project110.test/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            product_id: existingItem.id,
            quantity: existingItem.quantity,
            userId: id,
          }),
        });

        if (response.ok) {
          notify({
            title: "Success",
            text: "Item added to cart",
            icon: "success",
          });
        } else {
          throw new Error("Failed to add item to cart");
        }
      } catch (error) {
        notify({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    },

    async fetchCart() {
      const { userId, token } = getToken();
      if (!userId || !token) {
        notify({
          title: "Authentication Error",
          text: "Please log in to view your cart.",
          icon: "error",
        });
        return;
      }
      try {
        const response = await fetch(
          `http://project110.test/api/my-cart/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }
        const cartData = await response.json();
        console.log("Received cart data:", cartData); // Check the received data
        this.items = cartData.items;
        this.total = cartData.total;
        console.log("Updated total in store:", this.total); // Confirm store's total is updated
      } catch (error) {
        notify({
          title: "Error",
          text: "Failed to fetch cart items",
          icon: "error",
        });
        console.error("Fetch cart failed:", error);
      }
    },

    async updateCart(item) {
      const { token } = getToken();
      try {
        const response = await fetch(
          `http://project110.test/api/cart/${item.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            body: JSON.stringify({
              quantity: item.quantity,
              prod_price: item.product.prod_price, // Only if price updates are allowed
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update cart item");
        }

        const updatedItem = await response.json();
        this.items = this.items.map((i) =>
          i.id === item.id ? { ...i, ...updatedItem } : i
        );

        // const index = this.items.findIndex((i) => i.id === item.id);
        // if (index !== -1) {
        //   this.items[index] = updatedItem;
        // }

        notify({
          title: "Success",
          text: "Cart updated successfully",
          icon: "success",
        });
      } catch (error) {
        notify({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    },

    async removeFromCart(productId) {
      try {
        // Call removeCartItem which now returns the fetch response
        const response = await this.removeCartItem(productId);
        if (response.ok) {
          // Remove the item from the local state
          this.items = this.items.filter((item) => item.id !== productId);

          notify({
            title: "Success",
            message: "Item removed from cart",
            icon: "success",
            type: "success",
          });
        }
      } catch (error) {
        notify({
          title: "Error",
          message: error.message,
          type: "error",
        });
      }
    },

    async removeCartItem(productId) {
      const { token } = getToken();
      const response = await fetch(
        `http://project110.test/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Check if the response was not ok and throw an error
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || "Failed to delete cart item");
      }

      return response; // Return the response for further handling
    },

    clearCart() {
      this.items = [];
    },
    toggleCartModal() {
      this.showCartModal = !this.showCartModal;
    },
    getCategoryNameById(categortId) {
      const category = this.ProductCategory.find((c) => c.id === categortId);
      return category ? category.name : "Unkown Category";
    },
  },
});

// Make sure to call fetchCart when initializing the store or when the user logs in
