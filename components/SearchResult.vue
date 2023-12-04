<template>
  <div
    class="h-5/6 w-11/12 border-2 absolute top-40 p-10 rounded-lg z-50 bg-black flex flex-col justify-center"
    v-if="isVisible"
  >
    <button
      class="h-10 w-10 border-2 hover:bg-gray-700 rounded-full absolute right-5 top-5"
      @click="CloseModal"
    >
      <icon size="24" name="material-symbols:close-rounded" />
    </button>
    <h1>class="text-white">Search Result</h1>
  </div>
</template>

<script setup>
import { useSearchModal } from "@/composables/useSearchModal";
const { isVisible, CloseModal } = useSearchModal();
</script>
