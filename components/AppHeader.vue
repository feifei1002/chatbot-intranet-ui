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
            <NuxtLink v-t="'titles.chatbot'" to="/" class="grow pl-4 text-xl font-bold text-chatbot-font" />
            <div class="flex grow items-center justify-end">
                <NuxtLinkLocale
                    v-t="'titles.home'"
                    to="/"
                    class="px-4 text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                />
                <NuxtLinkLocale
                    v-if="!authStatus"
                    v-t="'titles.signin'"
                    to="/signin"
                    class="px-4 text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                />
                <NuxtLinkLocale
                    to="/chat"
                    class="px-4 text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                    >{{ $t("titles.trychatbot") }}
                    <UIcon name="i-heroicons-arrow-up-right" />
                </NuxtLinkLocale>
            </div>
        </div>
    </nav>
</template>
