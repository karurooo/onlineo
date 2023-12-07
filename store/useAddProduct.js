import { defineStore } from "pinia";

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
      { id: 1, name: "Jeans" },
      { id: 2, name: "Shirts" },
      { id: 3, name: "Tops" },
      { id: 4, name: "Shorts" },
      { id: 5, name: "Bottom ear" },
      { id: 6, name: "Shoes" },
    ],
    userId: "",
    Token: "",
    addProductSuccess: false,
  }),

  actions: {
    initalizeAuth() {
      if (process.client) {
        this.Token = localStorage.getItem("userToken");
        this.userId = localStorage.getItem("userId");
        if (!this.Token || !this.userId) {
          console.error("No token or userId found. Please Login");
        }
      }
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
                Authorization: `Bearer ${this.Token}`,
              },
              body: formData,
            }
          );

          console.log("Product added successfully:", responseBody);
          this.resetProduct();
          this.addProductSuccess = true;
        } catch (error) {
          console.error("Network error:", error);
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
