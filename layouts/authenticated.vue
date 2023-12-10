<template>
  <div
    class="h-screen w-full bg-black flex flex-col items-center"
    v-if="authenticated"
  >
    <NavbarAuth />
    <slot />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "authenticated",
});
</script>
