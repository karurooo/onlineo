<template>
  <div class="bg-black h-full w-full text-white">
    <Navbar />

    <div class="h-screen flex flex-col items-start justify-center mx-20">
      <div class="flex my-10">
        <div class="h-[250px] w-7/12 my-12">
          <h1 class="text-8xl font-bold">
            The fastest way to find or sell your perfect product.
          </h1>
        </div>
        <nuxt-img
          height="684px"
          width="684px"
          class="absolute right-20 top-36"
          src="https://res.cloudinary.com/dffn0kkyj/image/upload/v1701362721/onlineo-login-image_ofg8eb.png"
        />
      </div>
      <SearchBar />
    </div>

    <div class="h-screen w-full p-20 flex flex-col gap-10">
      <h1 class="text-3xl font-bold">How it works?</h1>
      <div class="flex flex-row flex-wrap gap-20 justify-center">
        <HowCards v-for="step in steps" :key="step.title" :step="step" />
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  {
    title: "Step 1",
    description:
      "Find your desired product. Type in the name of the product browse through categories to discover a wide range of options",
    image:
      "https://res.cloudinary.com/dffn0kkyj/image/upload/v1701316828/step-1_naxtoq.png",
  },
  {
    title: "Step 2",
    description:
      "View product details and add to cart. You're one step closer to owning the perfect item.",
    image:
      "https://res.cloudinary.com/dffn0kkyj/image/upload/v1701316827/step-2_x6veg6.png",
  },
  {
    title: "Step 3",
    description:
      "Secure your payment. Then, relax and wait for your product to be delivered!",
    image:
      "https://res.cloudinary.com/dffn0kkyj/image/upload/v1701316827/step-3_ytr4ax.webp",
  },
];
</script>
