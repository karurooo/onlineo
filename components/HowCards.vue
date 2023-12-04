<template>
  <div
    class="h-[700px] w-[384px] hover:scale-105 transition-transform duration-300 ease-in-out"
  >
    <div class="h-[500px] w-[384px] bg-white rounded-2xl shadow-2xl">
      <div class="h-[300px] w-[384px]">
        <nuxt-img
          class="h-[300px] w-[384px] object-cover rounded-t-2xl"
          :src="step.image"
          alt=""
        />
      </div>
      <div
        class="h-[200px] w-[384px] flex flex-col justify-center items-center"
      >
        <h1 class="text-3xl font-bold text-gray-800">
          {{ step.title }}
        </h1>
        <p class="text-lg text-gray-500 text-center px-5">
          {{ step.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  step: Object,
});
</script>
