<template>
  <div
    class="h-[600px] w-[600px] border-2 absolute top-40 left-[650px] p-10 rounded-lg z-50 bg-black flex flex-col justify-center"
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
        v-model="addProducts.ProductDetail[field.model]"
        :key="field.model"
        :type="field.type"
        :placeholder="field.placeholder"
        class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
      />
      <label for="">Product Image</label>
      <input
        class="block w-full text-sm text-white border-b-2 cursor-pointer bg-transparent focus:outline-none"
        type="file"
        @change="handleImageUpload"
        ref="fileInput"
      />

      <label for="underline_select" class="sr-only">Underline select</label>
      <select
        id="underline_select"
        class="block py-2.5 px-0 w-full text-sm text-white bg-black border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        v-model="addProducts.ProductDetail.category_id"
      >
        <option disabled selected>Product Category</option>
        <option
          v-for="category in addProducts.ProductCategory"
          :key="category.id"
          :value="category.id"
          class="text-white bg-black"
        >
          {{ category.name }}
        </option>
      </select>

      <button
        class="h-12 w-32 rounded-lg border-2 hover:bg-white hover:text-black"
        @click="handleAddProduct"
      >
        Add Product
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAddProductStore } from "~/store/useAddProduct";

const addProducts = useAddProductStore();
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

const ResetForm = () =>
  (form.value = {
    name: "",
    description: "",
    price: null,
    quantity: null,
    image: null,
    category_id: null,
  });

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["close-modal"]);

const CloseModal = () => {
  emit("close-modal");
};

const handleImageUpload = async (event) => {
  await addProducts.uploadImage(event);
};
const handleAddProduct = async () => {
  await addProducts.addProduct();
  if (addProducts.addProductSuccess) {
    CloseModal();
    ResetForm();
  }
};

onMounted(() => {
  addProducts.initalizeAuth();
});
</script>
