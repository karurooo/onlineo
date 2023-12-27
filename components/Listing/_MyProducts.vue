<template>
  <div
    class="h-full w-full bg-black min-h-screen text-[#F4EAE0] relative mx-auto max-w-2xl sm:py-24 lg:max-w-7xl lg:px-8"
  >
    <div class="py-6 relative">
      <div
        class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <div
          class="w-full max-w-sm bg-[#007BFF] text-white rounded-lg hover:cursor-pointer hover:scale-105 translate-transform ease-in-out duration-500 border"
          v-for="product in myProducts"
          :key="product.id"
        >
          <nuxt-img
            :src="product.prod_image"
            :alt="product.prod_name"
            class="p-2 lg:p-8 rounded-t-lg shadow-inner shadow-gray-900"
          />

          <div class="px-5 pb-5 relative">
            <div class="flex h-20 w-full py-3">
              <h3 class="text-sm lg:text-lg truncate font-semibold">
                {{ product.prod_name }}
              </h3>
            </div>

            <div class="flex justify-evenly items-center gap-4">
              <button
                class="text-sm lg:text-md font-bold px-3 lg:px-6 py-2 rounded-lg shadow-lg shadow-black text-white active:bg-black transform transition-transform ease-in-out duration-500 bg-[#FD7E14] hover:bg-[#E85D04]"
                @click="startEditing(product)"
              >
                Edit
              </button>
              <button
                class="text-sm font-bold px-4 py-2 rounded-lg shadow-lg shadow-black bg-[#FD7E14] hover:bg-[#E85D04] text-white"
                @click="deleteProduct(product.id)"
              >
                Delete
              </button>
            </div>
          </div>
          <!-- <div
            class="flex items-center justify-between gap-6 absolute bottom-0 px-auto"
          >
            <button
              class="shadow-lg shadow-black px-2 py-1 rounded hover:bg-gray-700"
              @click="startEditing(product)"
            >
              Edit
            </button>
            <button
              class="shadow-lg shadow-black px-2 py-1 rounded hover:bg-gray-700"
              @click="deleteProduct(product.id)"
            >
              Delete
            </button>
          </div> -->
        </div>
      </div>
      <Listing_EditProducts
        v-if="isEditing"
        :isVisible="isEditing"
        :product="editingProduct"
        @update="handleUpdate"
        @close="handleClose"
      />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/useAuthStore";
import { useProductStore } from "~/store/useProductStore";

const authStore = useAuthStore();
const productStore = useProductStore();
const isEditing = ref(false);
const editingProduct = ref(null);

const myProducts = computed(() => productStore.myProducts);

onMounted(() => {
  authStore.isAuthenticated
    ? productStore.fetchMyProducts()
    : console.log("User not found. Please log in.");
});

const startEditing = (product) => {
  console.log("Editing:", product); // Check if this logs
  editingProduct.value = product;
  isEditing.value = true;
};

const handleUpdate = (updatedProduct) => {
  isEditing.value = false;
  editingProduct.value = null;
};

const handleClose = () => {
  isEditing.value = false;
  editingProduct.value = null;
};
const deleteProduct = async (productId) => {
  await productStore.deleteProduct(productId);
  console.log("You successfully Deleted product with id:", productId);
};
</script>
