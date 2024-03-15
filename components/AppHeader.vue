<script setup>
const { status } = useAuth();
const authStatus = ref(status.value === "authenticated");
watch(status, newStatus => {
    authStatus.value = newStatus === "authenticated";
});
</script>

<template>
    <nav class="bg-navbar-blue p-6">
        <div class="container flex items-center">
            <NuxtImg preload src="/img/logo.png" width="60" />
            <NuxtLink to="/" class="w-3/4 pl-4 text-xl font-bold text-white">Chatbot</NuxtLink>
            <div class="absolute right-0 flex w-1/4 justify-between pr-6">
                <NuxtLink to="/" class="text-xl font-semibold text-white" exact-active-class="!text-chatbot-pink"
                    >Home</NuxtLink
                >
                <NuxtLink
                    v-if="!authStatus"
                    to="/signin"
                    class="text-xl font-semibold text-white"
                    exact-active-class="!text-chatbot-pink"
                    >Sign In</NuxtLink
                >
                <NuxtLink to="/chat" class="text-xl font-semibold text-white" exact-active-class="!text-chatbot-pink"
                    >Try Chatbot
                    <UIcon name="i-heroicons-arrow-up-right" />
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>
