<template>
  <div class="h-screen w-full rounded-lg bg-transparent text-white">
    <div class="py-6 px-6 relative">
      <div class="flex flex-col gap-4 max-h-[1000px] overflow-auto">
        <div
          class="w-[800px] shadow-lg shadow-gray-500 p-4 flex items-center gap-4 mb-2"
          v-for="product in myProducts"
          :key="product.id"
        >
          <nuxt-img
            :src="product.prod_image"
            :alt="product.prod_name"
            class="w-32 h-32 object-cover rounded-md mb-3"
          />
          <div class="flex flex-col w-1/2 self-start">
            <h3 class="text-3xl font-semibold">{{ product.prod_name }}</h3>
            <p class="text-lg text-gray-300 w-full">
              {{ product.prod_description }}
            </p>
            <div class="flex py-5 gap-5">
              <p
                class="bg-green-200 text-green-800 text-xl font-semibold px-2 py-1 rounded"
              >
                ₱{{ product.prod_price }}
              </p>
              <p
                class="bg-blue-200 text-blue-800 text-xl font-semibold px-2 py-1 rounded"
              >
                Quantity: {{ product.prod_stock }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-2 h-full w-1/5 mx-5">
            <button
              class="border px-2 py-1 rounded hover:bg-white hover:text-black transition-transform ease-in-out"
              @click="startEditing(product)"
            >
              Edit
            </button>
            <button
              class="border px-2 py-1 rounded hover:bg-white hover:text-black transition-transform ease-in-out"
              @click="deleteProduct(product.id)"
            >
              Delete
            </button>
          </div>
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
  if (authStore.isAuthenticated) {
    productStore.fetchMyProducts();
  } else {
    console.error("User not found. Please log in.");
  }
});

const startEditing = (product) => {
  console.log("Editing:", product); // Check if this logs
  editingProduct.value = product;
  isEditing.value = true;
};

const handleUpdate = (updatedProduct) => {
  // Logic to handle product update
  // ...
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
