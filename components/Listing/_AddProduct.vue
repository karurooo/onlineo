<template>
  <div
    class="h-[600px] w-[600px] border-2 absolute top-40 p-10 rounded-lg z-50 bg-black flex flex-col justify-center"
    v-if="isVisible"
  >
    <button
      class="h-10 w-10 border-2 hover:bg-gray-700 rounded-full absolute right-5 top-5"
      @click="CloseModal"
    >
      <icon size="24" name="material-symbols:close-rounded" />
    </button>
    <h1 class="text-4xl font-bold">Add Product</h1>
    <div class="flex flex-col gap-4">
      <input
        required
        v-for="field in InputField"
        v-model="ProductDetail[field.model]"
        :key="field.model"
        :type="field.type"
        :placeholder="field.placeholder"
        class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
      />
      <label for="">Product Image</label>
      <input
        class="block w-full text-sm text-white border-b-2 cursor-pointer bg-transparent focus:outline-none"
        type="file"
        @change="ImageUpload"
        ref="fileInput"
      />

      <label for="underline_select" class="sr-only">Underline select</label>
      <select
        id="underline_select"
        class="block py-2.5 px-0 w-full text-sm text-white bg-black border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        v-model="ProductDetail.category_id"
      >
        <option disabled selected>Product Category</option>
        <option
          v-for="category in ProductCategory"
          :key="category.id"
          :value="category.id"
          class="text-white bg-black"
        >
          {{ category.name }}
        </option>
      </select>

      <button
        class="h-12 w-32 rounded-lg border-2 hover:bg-white hover:text-black"
        @click="AddProduct"
      >
        Add Product
      </button>
    </div>
  </div>
</template>

<script setup>
const InputField = [
  {
    type: "text",
    model: "name", // Changed from placeholder to model
    placeholder: "Product Name",
  },
  {
    type: "text",
    model: "description",
    placeholder: "Product Description",
  },
  {
    type: "number",
    model: "price",
    placeholder: "Product Price (in ₱)",
  },
  {
    type: "number",
    model: "quantity",
    placeholder: "Product Quantity",
  },
];

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["close-modal"]);

const CloseModal = () => {
  emit("close-modal");
};

const ProductDetail = ref({
  name: "",
  description: "",
  price: null,
  quantity: null,
  image: null,
  category_id: null,
});

const ProductCategory = [
  {
    id: 1,
    name: "Jeans",
  },
  {
    id: 2,
    name: "Shirts",
  },
  {
    id: 3,
    name: "Tops",
  },
  {
    id: 4,
    name: "Shorts",
  },
  {
    id: 5,
    name: "Bottom Wear",
  },
];

const userId = ref("");
const token = ref("");

if (process.client) {
  token.value = localStorage.getItem("userToken");
  userId.value = localStorage.getItem("userId");

  if (!token.value || !userId.value) {
    console.error(
      "Please Login. No token and User ID found in the Local Storage"
    );
    // Handle lack of token or user ID appropriately, maybe redirect to login?
  }
}

const ImageUpload = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    // Ensure the file size is less than 2MB and is an acceptable image type
    if (
      file.size <= 2 * 1024 * 1024 &&
      ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)
    ) {
      ProductDetail.value.image = file;
    } else {
      console.error("File is either too large or not an image.");
      // Handle file error appropriately
    }
  }
};

const AddProduct = async () => {
  if (
    !ProductDetail.value.name ||
    !ProductDetail.value.category_id ||
    !ProductDetail.value.image ||
    !ProductDetail.value.price ||
    !ProductDetail.value.quantity
  ) {
    console.error("Required fields are missing");
    // Add more detailed error handling or user feedback here
    return;
  }
  const formData = new FormData();

  // Append product details to form data
  formData.append("prod_name", ProductDetail.value.name);
  formData.append("prod_description", ProductDetail.value.description);
  formData.append("prod_price", ProductDetail.value.price.toString());
  formData.append("prod_stock", ProductDetail.value.quantity.toString());
  formData.append("prod_image", ProductDetail.value.image);
  formData.append("category_id", ProductDetail.value.category_id);
  formData.append("user_id", userId.value);
  try {
    const response = await fetch("http://project110.test/api/product", {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token.value}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error(
        `Error: ${response.status} - ${response.statusText}`,
        errorResponse
      );
      // Handle HTTP error appropriately
    } else {
      const responseBody = await response.json();
      console.log("Product created successfully:", responseBody);
      ProductDetail.value = {
        name: "",
        description: "",
        price: null,
        quantity: null,
        image: null,
        category_id: null,
      };
      CloseModal(); // Close the modal on success
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
</script>
