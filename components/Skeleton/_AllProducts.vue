<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 justify-center"
  >
    <div
      class="animate-pulse bg-white shadow-gray-400 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 hover:scale-105 translate-transform ease-in-out duration-500"
      v-for="n in 10"
      :key="`skeleton-${n}`"
    >
      <div class="w-36 h-36 bg-gray-300 rounded mb-4"></div>

      <div class="w-5/6 h-8 bg-gray-300 rounded mb-2"></div>
      <div class="flex flex-col h-12 w-full items-center gap-2">
        <div class="w-4/6 h-10 bg-gray-500 rounded"></div>
        <div class="w-4/6 h-10 bg-gray-500 rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
