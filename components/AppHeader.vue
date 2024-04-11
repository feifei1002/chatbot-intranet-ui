<script setup>
const { status } = useAuth();
const authStatus = ref(status.value === "authenticated");

watch(status, newStatus => {
    authStatus.value = newStatus === "authenticated";
});

const { locale } = useI18n({ useScope: "global" });
const cookieLocale = useCookie("locale");

locale.value = cookieLocale.value ?? "en";

watch(locale, () => {
    cookieLocale.value = locale.value;
});
</script>

<template>
    <nav class="bg-chatbot-white p-6 drop-shadow-lg">
        <div class="container flex items-center">
            <NuxtImg preload src="/img/logo.png" width="60" />
            <NuxtLink v-t="'titles.chatbot'" to="/" class="w-3/4 pl-4 text-xl font-bold text-chatbot-font" />
            <div class="absolute right-0 flex w-1/4 justify-between pr-6">
                <form class="flex">
                    <select
                        id="locale-select"
                        v-model="$i18n.locale"
                        class="border-2 border-solid border-black bg-white text-chatbot-red"
                    >
                        <option value="en">en</option>
                        <option value="cy">cy</option>
                        <option value="ko">ko</option>
                    </select>
                </form>
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
