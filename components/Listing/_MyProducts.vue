<template>
  <div
    class="h-full w-full bg-black min-h-screen text-[#F4EAE0] relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
  >
    <div class="py-6 px-6 relative">
      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <div
          class="w-full max-w-sm bg-[#F4EAE0] rounded-lg hover:cursor-pointer hover:scale-105 translate-transform ease-in-out duration-500 relative"
          v-for="product in myProducts"
          :key="product.id"
        >
          <nuxt-img
            :src="product.prod_image"
            :alt="product.prod_name"
            class="p-8 hover:p-4 bg-[#F4DFC8] shadow-black shadow-inner transition-transform duration-300 ease-in-out"
          />

          <div class="pb-5 relative h-32">
            <h3
              class="text-lg font-semibold tracking-tight text-center text-gray-900 px-10"
            >
              {{ product.prod_name }}
            </h3>

            <div
              class="flex justify-evenly items-center mt-3 gap-4 absolute bottom-0 w-full h-20"
            >
              <button
                class="text-md font-bold px-6 py-2 rounded-lg shadow-md shadow-black text-black hover:animate-bounce active:bg-[#FAF6F0] transition-transform duration-300 ease-in-out"
                @click="startEditing(product)"
              >
                Edit
              </button>
              <button
                class="text-sm font-bold px-4 py-2 rounded-lg shadow-md shadow-black bg-black border text-[#F4DFC8] hover:animate-bounce transition-transform duration-300 ease-in-out"
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
