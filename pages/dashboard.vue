<template>
  <div class="h-screen w-full text-white bg-black flex flex-col items-center s">
    <NavbarAuth />
    <div class="h-5/6 w-full mt-20 flex flex-col items-center">
      <h1 class="text-4xl self-start font-bold ml-20 my-6">Top Picks</h1>
      <Products_TopPicks />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "authenticated",
});
</script>
