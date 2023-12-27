<template>
  <div
    class="flex h-screen bg-black text-white items-center justify-center p-8 flex-col gap-4 lg:gap-20"
  >
    <form
      @submit.prevent="SubmitLogin"
      class="flex flex-col w-full max-w-md p-6 gap-4 bg-[#343A40] rounded-lg shadow-lg md:scale-105"
    >
      <h1 class="text-3xl font-bold text-center">Signin</h1>
      <div v-for="Field in FormField">
        <input
          required
          v-model="LoginData[Field.model]"
          :type="Field.type"
          :id="Field.id"
          :placeholder="Field.placeholder"
          class="w-full px-4 py-2 bg-white text-black text-sm rounded-lg shadow-black shadow-lg border"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 mt-4 text-white bg-[#007BFF] shadow-black rounded-lg shadow-lg hover:bg-[#005AE0]"
      >
        Signin
      </button>
      <NuxtLink
        to="/register"
        class="mt-4 text-sm text-white hover:underline hover:text-[#007BFF] text-center"
      >
        Don't have an account? Signup
      </NuxtLink>
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
