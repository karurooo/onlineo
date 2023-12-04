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
    const { data: response, error } = await useFetch(
      "http://project110.test/api/login",
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(LoginData.value),
      }
    );
    if (error.value) {
      console.error("error", error.value);
      return;
    } else {
      console.log("login successfully", response.value);
      if (response.value && response.value.user && response.value.token) {
        console.log(response.value.user.id);
        localStorage.setItem("userToken", response.value.token);
        localStorage.setItem("userId", response.value.user.id);
        router.push("/dashboard");
      } else {
        // Handle the case where the expected properties are not defined
        console.error("Unexpected response structure:", response.value);
      }
    }
  } catch (error) {
    console.error("Catch Error:", error);
  }
};
</script>
