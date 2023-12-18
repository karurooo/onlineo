import { defineStore } from "pinia";

export const useEditProductStore = defineStore("EditProduct", {
  state: () => ({
    // Assuming you have a method to set the current product to be edited
    EditProductDetail: {
      id: null,
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
    currentProductId: null,
    editProductSuccess: false,
  }),

  actions: {
    setProductToEdit(product) {
      this.currentProductId = product.id;
      this.EditProductDetail = { ...product };
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
            formData.append("upload_preset", "lmm7jq3h");

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
            this.EditProductDetail.image = result.secure_url; // Store the image URL in your edit product state
          } catch (error) {
            console.error("Image upload error:", error);
          }
        } else {
          console.error("File is either too large or not an image.");
        }
      }
    },

    async updateProduct() {
      // First, check if all required fields are present
      if (
        !this.EditProductDetail.name ||
        !this.EditProductDetail.description ||
        !this.EditProductDetail.price ||
        !this.EditProductDetail.quantity ||
        !this.EditProductDetail.image ||
        !this.EditProductDetail.category_id
      ) {
        console.error("Please fill all the fields");
        return;
      }

      // Prepare the data to be sent in JSON format
      const productData = {
        prod_name: this.EditProductDetail.name,
        prod_description: this.EditProductDetail.description,
        prod_price: this.EditProductDetail.price,
        prod_stock: this.EditProductDetail.quantity,
        prod_image: this.EditProductDetail.image,
        category_id: this.EditProductDetail.category_id,
      };

      try {
        // Make the PUT request to the server
        const response = await fetch(
          `http://project110.test/api/product/${this.currentProductId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              "Content-Type": "application/json", // Set Content-Type to application/json
              Accept: "application/json",
            },
            body: JSON.stringify(productData), // Send the product data as a JSON string
          }
        );

        const result = await response.json();

        if (!response.ok) {
          // If the response is not OK, throw an error with the result
          throw new Error(result.message || "Failed to update the product");
        }

        console.log("Product updated successfully:", result);
        this.editProductSuccess = true;

        // Emit an event or perform additional actions as needed after a successful update
        // For example, you could emit an event to the parent component to refresh the product list
        // emit('productUpdated', result);
      } catch (error) {
        // If an error occurs, log it and possibly handle it (e.g., show an error message to the user)
        console.error("Error updating product:", error);
        // You could also set an error state here
        // this.editProductError = true;
      }
    },

    setProductToEdit(product) {
      // Method to set the current product details from an existing product

      this.currentProductId = product.id;
    },
    resetEditProduct() {
      // Reset method to clear the product details
      this.EditProductDetail = {
        id: null,
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
