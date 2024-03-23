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
            <NuxtLink v-t="'titles.chatbot'" to="/" class="w-3/4 pl-4 text-xl font-bold text-chatbot-font" />
            <div class="absolute right-0 flex w-1/4 justify-between pr-6">
                <NuxtLinkLocale
                    v-t="'titles.home'"
                    to="/"
                    class="text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                />
                >
                <NuxtLinkLocale
                    v-if="!authStatus"
                    v-t="'titles.signin'"
                    to="/signin"
                    class="text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                />
                >
                <NuxtLinkLocale
                    to="/chat"
                    class="text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                    >{{ $t("titles.trychatbot") }}
                    <UIcon name="i-heroicons-arrow-up-right" />
                </NuxtLinkLocale>
            </div>
        </div>
    </nav>
</template>
