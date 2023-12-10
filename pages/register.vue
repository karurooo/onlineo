<template>
  <div
    class="h-screen w-full bg-black text-white flex flex-col justify-center items-center"
  >
    <form
      class="h-[584px] w-[484px] border-2 border-white flex flex-col gap-4 justify-center items-center"
      @submit.prevent="SubmitSignup"
    >
      <h1 class="self-center text-3xl font-bold">Signup</h1>
      <input
        required
        v-model="RegisterData[Field.model]"
        :type="Field.type"
        :id="Field.id"
        :placeholder="Field.placeholder"
        class="w-11/12 h-12 bg-transparent border-2 border-gray-400 text-sm rounded-lg p-2.5"
        v-for="Field in FormField"
        :key="Field.id"
      />

      <button
        class="h-10 w-11/12 my-4 self-center bg-white text-black hover:bg-black hover:text-white hover:border-2 rounded-lg"
        type="submit"
      >
        Register
      </button>
      <Nuxt-Link
        to="/login"
        class="text-sm hover:scale-105 hover:text-gray-400"
      >
        Already have an account? Sign in
      </Nuxt-Link>
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
