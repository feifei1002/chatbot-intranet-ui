<script setup>
const { status } = useAuth();
const authStatus = ref(status.value === "authenticated");
watch(status, newStatus => {
    authStatus.value = newStatus === "authenticated";
});
</script>

<template>
    <nav class="bg-chatbot-white p-6">
        <div class="container flex items-center">
            <NuxtImg preload src="/img/logo.png" width="60" />
            <NuxtLink to="/" class="w-3/4 pl-4 text-xl font-bold text-chatbot-font">Chatbot</NuxtLink>
            <div class="absolute right-0 flex w-1/4 justify-between pr-6">
                <NuxtLink to="/" class="text-xl font-semibold text-chatbot-font" exact-active-class="!text-chatbot-red"
                    >Home</NuxtLink
                >
                <NuxtLink
                    v-if="!authStatus"
                    to="/signin"
                    class="text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                    >Sign In</NuxtLink
                >
                <NuxtLink
                    to="/chat"
                    class="text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                    >Try Chatbot
                    <UIcon name="i-heroicons-arrow-up-right" />
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>
