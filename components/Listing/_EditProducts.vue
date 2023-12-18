<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
  >
    <div
      class="bg-[#F4DFC8] shadow-gray-300 p-6 rounded-lg shadow-xl max-w-md w-full"
    >
      <h2 class="text-xl font-bold mb-4 text-black">Edit Product</h2>
      <div class="mb-4">
        <input
          required
          v-for="field in InputField"
          v-model="editProductStore.EditProductDetail[field.model]"
          :key="field.model"
          :type="field.type"
          :placeholder="field.placeholder"
          class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
        />
      </div>

      <label
        for="productImage"
        class="block mb-2 text-sm font-medium text-gray-700"
        >Product Image</label
      >
      <input
        type="file"
        @change="handleImageUpload"
        class="block w-full text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
        id="productImage"
      />

      <label for="underline_select" class="sr-only">Underline select</label>

      <select
        id="underline_select"
        class="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-black b appearance-none focus:outline-none focus:ring-0 focus:border-gray-900"
        v-model="editProductStore.EditProductDetail.category_id"
        @change="handleSelectChange"
      >
        <option disabled selected>Product Category</option>
        <option
          v-for="category in editProductStore.ProductCategory"
          :key="category.id"
          :value="category.id"
          class="text-gray-700 bg-white hover:bg-gray-100"
        >
          {{ category.name }}
        </option>
      </select>
      <div class="flex justify-end mt-6">
        <button
          @click="save"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
        >
          Save
        </button>
        <button
          @click="cancel"
          class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEditProductStore } from "~/store/useEditProduct";
import { ref, watchEffect } from "vue";

const editProductStore = useEditProductStore();
const InputField = [
  {
    type: "text",
    model: "name",
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

console.log(editProductStore.EditProductDetail);

const emit = defineEmits(["update", "close"]);
const props = defineProps({
  product: Object,
  isVisible: Boolean,
});

// Create a reactive copy of the product prop to use in the template
const product = ref({ ...props.product });

watchEffect(() => {
  product.value = { ...props.product };
});

onMounted(() => {
  if (props.product && props.product.id) {
    editProductStore.setProductToEdit(props.product);
  }
});

const save = async () => {
  try {
    await editProductStore.updateProduct();
    emit("update", editProductStore.EditProductDetail);
    // Additional success handling
  } catch (error) {
    console.error("Error updating product:", error);
    // Additional error handling
  }
};

const cancel = () => {
  emit("close");
};

const handleImageUpload = async (event) => {
  await editProductStore.uploadImage(event);
  console.log(editProductStore.EditProductDetail.image);
};

const handleSelectChange = (event) => {
  editProductStore.EditProductDetail.category_id = event.target.value;
};
</script>
