<template>
  <div
    class="flex flex-col h-screen w-full bg-black text-white items-center justify-center p-8"
  >
    <form
      @submit.prevent="SubmitSignup"
      class="flex flex-col items-center justify-center w-full max-w-md p-6 gap-4 bg-[#343A40] rounded-lg shadow-lg md:scale-105"
    >
      <h1 class="text-3xl font-bold text-white">Signup</h1>
      <template v-for="Field in FormField">
        <input
          required
          v-model="RegisterData[Field.model]"
          :type="Field.type"
          :id="Field.id"
          :placeholder="Field.placeholder"
          class="w-full px-4 py-2 text-sm rounded-lg text-black bg-white shadow-gray-400 shadow-lg"
        />
      </template>
      <button
        type="submit"
        class="w-full py-2 mt-4 text-white bg-[#007BFF] rounded-lg shadow-lg shadow-black hover:bg-[#005AE0]"
      >
        Register
      </button>
      <NuxtLink
        to="/login"
        class="mt-4 text-sm text-white hover:underline hover:text-[#007BFF]"
      >
        Already have an account? Sign in
      </NuxtLink>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/store/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();

const FormField = [
  {
    id: "first_name",
    model: "first_name",
    type: "text",
    placeholder: "First Name",
    required: true,
  },
  {
    id: "last_name",
    model: "last_name",
    type: "text",
    placeholder: "Last Name",
    required: true,
  },
  {
    id: "username",
    model: "username",
    type: "text",
    placeholder: "Username",
    required: true,
  },
  {
    id: "email",
    model: "email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    id: "password",
    model: "password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
  {
    id: "confirm_password",
    model: "confirm_password",
    type: "password",
    placeholder: "Confirm Password",
    required: true,
  },
];

const RegisterData = ref({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
});

const SubmitSignup = async () => {
  await authStore.register(RegisterData.value);
  router.push("/login");
};
</script>
