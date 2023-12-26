import { defineStore } from "pinia";
import { useNotification } from "~/composables/useNotifications";
import { getToken } from "~/utils/token";
import { useProductStore } from "./useProductStore";

const { notify } = useNotification();
export const useAddProductStore = defineStore("AddProduct", {
  state: () => ({
    ProductDetail: {
      name: "",
      description: "",
      price: null,
      quantity: null,
      image: null,
      category_id: null,
    },
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
    userId: "",
    token: "",
    addProductSuccess: false,
  }),

  actions: {
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
            this.ProductDetail.image = result.secure_url;
            notify({
              title: "Image Upload Success",
              text: "Your image has been uploaded successfully",
              icon: "success",
            });
          } catch (error) {
            console.error("Image upload error:", error);
          }
        } else {
          console.error("File is either too large or not an image.");
        }
      }
    },

    async addProduct() {
      if (
        !this.ProductDetail.name ||
        !this.ProductDetail.description ||
        !this.ProductDetail.price ||
        !this.ProductDetail.quantity ||
        !this.ProductDetail.image ||
        !this.ProductDetail.category_id
      ) {
        console.error("Please fill all the fields");
        return;
      } else {
        const formData = new FormData();
        formData.append("prod_name", this.ProductDetail.name);
        formData.append("prod_description", this.ProductDetail.description);
        formData.append("prod_price", this.ProductDetail.price.toString());
        formData.append("prod_stock", this.ProductDetail.quantity.toString());
        formData.append("prod_image", this.ProductDetail.image);
        formData.append("category_id", this.ProductDetail.category_id);
        formData.append("user_id", this.userId);

        try {
          const responseBody = await $fetch(
            "http://project110.test/api/product",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${this.token}`,
              },
              body: formData,
            }
          );

          notify({
            title: "Product Add Success",
            text: "Your product has been added successfully",
            icon: "success",
          });
          console.log("Product added successfully:", responseBody);

          const productStore = useProductStore();
          await productStore.fetchMyProducts();
          this.resetProduct();
          this.addProductSuccess = true;
        } catch (error) {
          console.error("Network error:", error);
          this.addProductSuccess = false;
        }
      }
    },
    resetProduct() {
      this.ProductDetail = {
        name: "",
        description: "",
        price: null,
        quantity: null,
        image: null,
        category_id: null,
      };
    },
  },
});
