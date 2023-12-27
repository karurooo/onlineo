<template>
  <div
    class="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
    v-if="isVisible"
  >
    <div
      class="h-[600px] w-[600px] border absolute top-40 left-0 xl:left-[450px] lg:left-[230px] 2xl:left-[650px] p-10 rounded-lg z-50 bg-[#343A40] flex flex-col justify-center"
    >
      <button
        class="h-10 w-10 shadow-lg shadow-black bg-[#007BFF] hover:bg-gray-700 rounded-full absolute right-5 top-5"
        @click="closeModal"
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
          class="block py-2.5 px-0 w-full text-sm text-white bg-[#343A40] border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          v-model="addProducts.ProductDetail.category_id"
        >
          <option disabled selected>Product Category</option>
          <option
            v-for="category in addProducts.ProductCategory"
            :key="category.id"
            :value="category.id"
            class="text-white bg-[#343A40]"
          >
            {{ category.name }}
          </option>
        </select>

        <button
          class="h-12 w-32 rounded-lg border-2 bg-[#FD7E14] hover:bg-[#E85D04]"
          @click="handleAddProduct"
        >
          Add Product
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAddProductStore } from "~/store/useAddProduct";
import { useNotification } from "~/composables/useNotifications";

const { notify } = useNotification();

const props = defineProps({
  isVisible: Boolean,
});

// Setup the close event emitter
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close"); // This emits the "close" event
  console.log("Modal closed");
};
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

const handleImageUpload = async (event) => {
  await addProducts.uploadImage(event);
};
const handleAddProduct = async () => {
  await addProducts.addProduct();
  if (addProducts.addProductSuccess) {
    notify({
      title: "You Successfully Added a Product",
      text: "You can now see your product in your dashboard",
      icon: "success",
      confirmButtonText: "OK",
    });
    closeModal();
  } else {
    // Handle the error case
    notify({
      title: "Error Adding Product",
      text: "Please try again or contact support if the problem persists.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

onMounted(() => {
  addProducts.initalizeAuth();
});
</script>
