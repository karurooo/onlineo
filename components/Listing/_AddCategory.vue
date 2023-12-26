<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex justify-center items-center">
    <div
      class="h-[600px] w-[600px] absolute top-40 p-10 rounded-lg z-50 bg-[#343A40] flex flex-col justify-center"
    >
      <button
        class="h-10 w-10 shadow-lg shadow-black bg-[#007BFF] hover:bg-gray-700 rounded-full absolute right-5 top-5"
        @click="closeModal"
      >
        <icon size="24" name="material-symbols:close-rounded" />
      </button>
      <h1 class="text-4xl font-bold">Add Category</h1>
      <div class="flex flex-col gap-4">
        <input
          required
          v-model="addCategory.CategoryDetail.name"
          type="text"
          placeholder="Category Name"
          class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
        />
        <label for="categoryImage">Category Image</label>
        <input
          class="block w-full text-sm text-white border-b-2 cursor-pointer bg-transparent focus:outline-none"
          id="categoryImage"
          type="file"
          @change="handleImageUpload"
          ref="fileInput"
        />
        <button
          class="h-12 w-32 rounded-lg border-2 hover:bg-white hover:text-black"
          @click="handleAddCategory"
        >
          Add Category
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCategoryStore } from "~/store/useCategoryStore";
import { useNotification } from "~/composables/useNotifications";

const { notify } = useNotification();
const addCategory = useCategoryStore();

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
const handleImageUpload = async (event) => {
  await addCategory.uploadImage(event);
};

const handleAddCategory = async () => {
  await addCategory.addCategory();
  console.log(addCategory.addCategorySuccess);
  if (addCategory.addCategorySuccess) {
    notify({
      title: "You Successfully Added a Category",
      text: "You can now see your product in your dashboard",
      icon: "success",
      confirmButtonText: "OK",
    });
    closeModal();
  } else {
    // Handle the error case
    notify({
      title: "Error Adding Category",
      text: "Please try again or contact support if the problem persists.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};
</script>
