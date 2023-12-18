<template>
  <div
    class="flex h-screen w-full bg-black text-white items-center justify-center"
  >
    <form
      @submit.prevent="SubmitSignup"
      class="flex flex-col items-center justify-center w-full max-w-md p-6 gap-4 bg-black shadow-gray-400 rounded-lg shadow-lg"
    >
      <h1 class="text-3xl font-bold">Signup</h1>
      <template v-for="Field in FormField">
        <input
          required
          v-model="RegisterData[Field.model]"
          :type="Field.type"
          :id="Field.id"
          :placeholder="Field.placeholder"
          class="w-full px-4 py-2 bg-transparent text-sm rounded-lg bg-black shadow-gray-400 shadow-lg"
        />
      </template>
      <button
        type="submit"
        class="w-full py-2 mt-4 text-white bg-gray-800 rounded-lg shadow-lg hover:bg-gray-600"
      >
        Register
      </button>
      <NuxtLink
        to="/login"
        class="mt-4 text-sm hover:underline hover:text-gray-300"
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
