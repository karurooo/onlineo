<!-- CartListItem.vue -->
<template>
  <li
    class="flex lg:flex-row justify-between items-center bg-[#F4DFC8] text-black p-4 rounded-lg shadow-md shadow-black"
  >
    <div class="flex items-center space-x-4 mb-4 lg:mb-0">
      <nuxt-img
        :src="item?.product?.prod_image"
        class="h-20 w-20 object-cover"
      />
      <p class="font-semibold text-sm w-1/2 truncate">
        {{ item?.product?.prod_name }}
      </p>
    </div>
    <div class="flex items-center lg:gap-3 mb-4 lg:mb-0">
      <button
        class="h-8 w-8 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
        @click="changeQuantity(-1)"
      >
        <icon name="ic:twotone-minus" size="20" />
      </button>
      <span class="mx-2">{{ item?.quantity }}</span>
      <button
        class="h-8 w-8 rounded-lg border-2 shadow-lg hover:bg-gray-700 hover:text-white"
        @click="changeQuantity(1)"
      >
        <icon name="material-symbols:add" size="20" />
      </button>
    </div>
    <div class="flex flex-col lg:flex-row items-center">
      <span class="mb-4 lg:mb-0 lg:mr-4"
        >₱{{ item?.product?.prod_price * item?.quantity }}</span
      >
      <button
        class="shadow-lg shadow-gray-400 h-8 w-12 lg:h-10 lg:w-24 border-2 rounded-lg hover:bg-white hover:text-black text-sm lg:text-base"
        @click="$emit('remove')"
      >
        Remove
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: ["remove", "updateQuantity"],
  methods: {
    changeQuantity(amount) {
      const newQuantity = this.item.quantity + amount;
      if (newQuantity > 0) {
        this.$emit("updateQuantity", newQuantity);
      }
    },
  },
};
</script>
