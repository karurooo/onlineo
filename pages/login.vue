<template>
  <div
    class="h-screen w-full bg-black text-white flex flex-col justify-center items-center"
  >
    <form
      class="h-[584px] w-[484px] border-2 border-white flex flex-col gap-4 justify-center items-center"
      @submit.prevent="SubmitLogin"
    >
      <h1 class="self-center text-3xl font-bold">Signin</h1>
      <input
        required
        v-model="LoginData[Field.model]"
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
        Signin
      </button>
      <Nuxt-Link
        to="/register"
        class="text-sm hover:scale-105 hover:text-gray-400"
      >
        Don't have an account? Signup
      </Nuxt-Link>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/store/useAuthStore";

const authStore = useAuthStore();
const router = useRouter();

const FormField = [
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
];
const LoginData = ref({
  email: "",
  password: "",
});

const SubmitLogin = async () => {
  try {
    const csrfResponse = await useFetch(
      "http://project110.test/api/csrf-token"
    );

    if (csrfResponse) {
      console.log(csrfResponse);
    }
    const csrfToken = csrfResponse.data["csrf_token"];

    console.log(csrfToken);
    // Call the login action from your auth store
    await authStore.login(LoginData.value, csrfToken);
    // If login is successful, redirect to the dashboard

    if (authStore.isAuthenticated) {
      router.push("/dashboard");
    } else {
      // Handle the case where login was not successful
      console.error("Login failed: User is not authenticated.");
    }
  } catch (error) {
    console.error(" Error:", error);
  }
};
</script>
