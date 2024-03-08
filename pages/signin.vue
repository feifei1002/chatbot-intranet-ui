<script setup>
import { ref } from 'vue';
const username = ref('');
const password = ref('');
const { signIn } = useAuth()



const submitInput = async () => {
    const credentials = {
      username: username.value,
      password: password.value,
    }
    try {
      // This sends a POST request to the `auth.provider.endpoints.signIn` (/api/token) endpoint with `credentials` as the body
      await signIn(credentials)
      alert('Successfully logged in!')
      await navigateTo('/')
    } catch (error) {
      console.error(error)
    }

}
</script>

<template>
    <div class="flex">
        <div class="flex h-screen w-1/2 items-center justify-center bg-chatbot-pink">
        </div>
        <div class="flex h-screen w-1/2 items-center justify-start bg-white pl-20">
            <div class="flex-col pt-6">
                <p class="text-navbar-blue font-bold text-6xl underline pt-6 pb-6"> WELCOME! </p>

                <div class="mb-4">
                    <input v-model="username" type="text" id="username" name="username" placeholder="USERNAME" required
                        class="mt-1 w-full rounded-md bg-white text-navbar-blue border-solid border-2 border-chatbot-pink">
                </div>
                <div>
                    <input v-model="password" type="password" id="password" name="password" placeholder="PASSWORD" required
                        class="mt-1 w-full rounded-md bg-white text-navbar-blue border-solid border-2 border-chatbot-pink">
                </div>
                <div class="flex my-2">
                    <input type="checkbox" id="remember_me" name="remember_me">
                    <label for="remember_me" class="ml-2 block text-sm text-navbar-blue">Remember me</label>
                </div>
                <button @click="submitInput" class="w-full bg-navbar-blue text-white py-2 px-4 rounded-md">Sign in</button>
            </div>
        </div>
    </div>
</template>
