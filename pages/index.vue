<template>
  <div class="bg-black h-screen w-full">
    <Navbar />
    <div class="flex flex-col">
      <div class="items-center flex flex-col lg:mt-60 mt-44 px-8">
        <h1 class="text-5xl lg:text-6xl font-bold text-white">
          Welcome to <span class="text-yellow-400">Onlineo</span>!
        </h1>
        <p class="text-[#F4EAE0] font-bold text-lg lg:text-2xl">
          Your one stop shop for your best footware apparel
        </p>
      </div>

      <SearchBar />
      <Products_Category />
    </div>
  </div>
</template>

<script setup></script>
