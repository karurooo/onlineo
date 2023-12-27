<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 justify-center"
  >
    <div
      class="animate-pulse bg-white shadow-gray-400 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center mx-auto hover:scale-105 translate-transform ease-in-out duration-500"
      v-for="n in 5"
      :key="`skeleton-${n}`"
    >
      <div class="h-96 w-72 shadow-lg bg-white shadow-black rounded-lg border">
        <div
          class="m-3 lg:p-8 rounded-lg shadow-inner shadow-gray-900 bg-gray-300 h-56 w-11/12"
        ></div>
        <div class="flex flex-col h-28 w-full items-center justify-end gap-2">
          <div class="w-4/6 h-10 bg-gray-300 rounded-lg"></div>
          <div class="w-4/6 h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
