import { defineStore } from "pinia";
import { useNotification } from "~/composables/useNotifications";
import { getToken } from "~/utils/token";

const { notify } = useNotification();

export const useCategoryStore = defineStore("Category", {
  state: () => ({
    CategoryDetail: {
      name: "",
      image: null, // Add this to hold the image URL
    },
    allCategories: [],
    addCategorySuccess: false,
    products: [],
    showModal: false,
  }),

  actions: {
    showProducts(products) {
      this.products = products;
      this.showModal = true;
    },
    hideModal() {
      this.products = [];
      this.showModal = false;
    },

    initalizeAuth() {
      const { token, userId } = getToken();
      this.userId = userId;
      this.token = token;
    },
    async uploadImage(event) {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];
        if (
          file.size <= 2 * 1024 * 1024 &&
          ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
            file.type
          )
        ) {
          try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "lmm7jq3h"); // Replace with your actual upload preset

            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dffn0kkyj/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );

            if (!response.ok) {
              throw new Error("Failed to upload image");
            }

            const result = await response.json();
            this.CategoryDetail.image = result.secure_url;
            notify({
              title: "Success",
              message: "Image uploaded successfully",
              type: "success",
            });
          } catch (error) {
            console.error("Image upload error:", error);
          }
        } else {
          console.error("File is either too large or not an image.");
        }
      }
    },

    async addCategory() {
      if (!this.CategoryDetail.name || !this.CategoryDetail.image) {
        notify({
          title: "Error",
          message: "Please fill all the fields",
          type: "error",
        });
        return;
      }
      const categoryStore = useCategoryStore();
      categoryStore.initalizeAuth();
      try {
        const response = await fetch("http://project110.test/api/category", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`, // Make sure this token is properly initialized in your store
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_name: this.CategoryDetail.name,
            image_url: this.CategoryDetail.image,
          }),
        });

        const result = await response.json(); // Assuming the server responds with JSON

        if (!response.ok) {
          throw new Error(result.message || "Failed to add category");
        }

        this.addCategorySuccess = true;
        notify({
          title: "Success",
          message: "Category added successfully",
          type: "success",
        });
      } catch (error) {
        notify({
          title: "Error",
          message: error.message || "Failed to add category",
          type: "error",
        });
        this.addCategorySuccess = false;
      }
    },
    async fetchAllCategories() {
      try {
        const response = await fetch("http://project110.test/api/category", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch all categories");
        }
        const allCategories = await response.json();
        console.log(allCategories);
        return allCategories; // Assuming the API returns the array of products directly
      } catch (error) {}
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
