<template>
  <div class="h-14 w-full bg-black flex justify-around py-3">
    <div class="w-52">
      <NuxtLink to="/dashboard">
        <h1 class="font-bold text-4xl">Onlineo</h1>
      </NuxtLink>
    </div>
    <div class="w-1/2">
      <SearchBar />
    </div>
    <div class="flex gap-8">
      <button
        class="h-12 w-12 rounded-full hover:scale-105 border-2 hover:bg-slate-500"
        v-for="button in buttons"
        :key="button"
        @click="
          button.icon === 'material-symbols:shopping-cart-rounded'
            ? openCart()
            : null
        "
      >
        <NuxtLink :to="button.link">
          <icon size="32" :name="button.icon" />
        </NuxtLink>
      </button>
    </div>
  </div>
</template>

<script setup>
const buttons = [
  { icon: "material-symbols:dashboard", link: "/dashboard" },
  { icon: "material-symbols:shopping-cart-rounded", link: "/cart" },
  { icon: "material-symbols:sell-outline", link: "/seller_dashboard" },
  { icon: "material-symbols:person", link: "/profile" },
];
</script>
