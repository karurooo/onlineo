<template>
  <div
    class="h-full w-full flex flex-col items-center bg-black text-white relative"
  >
    <NavbarAuth />
    <Products_Display />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "authenticated",
});
</script>
