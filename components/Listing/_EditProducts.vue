<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
  >
    <div
      class="h-[600px] w-[600px] absolute top-40 p-10 rounded-lg z-50 bg-[#343A40] flex flex-col justify-center"
    >
      <h1 class="text-4xl font-bold">Edit Product</h1>
      <div class="flex flex-col gap-4">
        <input
          required
          v-for="field in InputField"
          v-model="editProductStore.EditProductDetail[field.model]"
          :key="field.model"
          :type="field.type"
          :placeholder="field.placeholder"
          class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
        />
      </div>
      <label class="my-4">Product Image</label>
      <input
        class="block w-full text-sm text-white border-b-2 cursor-pointer bg-[#343A40] focus:outline-none"
        id="categoryImage"
        type="file"
        @change="handleImageUpload"
        ref="fileInput"
      />
      <label class="sr-only">Product Category</label>

      <select
        id="underline_select"
        class="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900"
        v-model="editProductStore.EditProductDetail.category_id"
        @change="handleSelectChange"
      >
        <label class="my-4">Product Category</label>
        <icon name="ion:md-arrow-dropdown" />
        <option disabled selected>Product Category</option>
        <option
          v-for="category in editProductStore.ProductCategory"
          :key="category.id"
          :value="category.id"
          class="text-white bg-[#343A40]"
        >
          {{ category.name }}
        </option>
      </select>
      <div class="flex justify-end mt-6 gap-4">
        <button
          @click="save"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg shadow-black"
        >
          Save
        </button>
        <button
          @click="cancel"
          class="bg-[#FD7E14] hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg shadow-black"
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
