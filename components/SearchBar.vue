<template>
  <div class="flex flex-col sm:flex-row items-center gap-2">
    <input
      type="text"
      placeholder="Explore Products"
      class="h-12 w-full sm:w-[750px] rounded-xl p-2 bg-transparent border-2"
    />
    <button
      class="h-12 w-24 rounded-lg border-2 hover:bg-white hover:text-black"
      @click="ShowModal = true"
      :isVisible="ShowModal"
      @close-modal="ShowModal = false"
    >
      Search <icon name="ic:outline-search" />
    </button>
  </div>
</template>

<script setup>
const ShowModal = ref(false);
</script>
