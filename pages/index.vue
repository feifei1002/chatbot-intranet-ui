<template class="h-screen w-screen">
    <div class="flex">
        <div class="flex h-screen w-1/2 items-center justify-center bg-chatbot-black">
            <p
                v-t="'index.about'"
                class="flex justify-around text-balance pt-6 text-center font-mono text-4xl font-bold text-chatbot-white"
            />

            <!-- button for testing logout -->
            <button class="w-full rounded-md bg-chatbot-black px-4 py-2 text-chatbot-white" @click="logout()">
                CLICK TO LOGOUT
            </button>
        </div>
        <div class="flex h-screen w-1/2 items-center justify-center bg-chatbot-red">
            <div class="flex items-center justify-center pt-6">
                <NuxtImg src="/img/landingImage.png" />
            </div>
        </div>
    </div>
</template>

<script setup>
const { token } = useAuth();
const config = useRuntimeConfig();
const logout = async () => {
    console.log("clicked");

    await $fetch(`${config.public.apiURL}/logout_two`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            // add authorization header if token is present
            ...(token.value && { Authorization: token.value }),
        },
    });
};
</script>
