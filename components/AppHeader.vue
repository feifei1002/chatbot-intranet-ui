<script setup>
const { status } = useAuth();
const authStatus = ref(status.value === "authenticated");
watch(status, newStatus => {
    authStatus.value = newStatus === "authenticated";
});
</script>

<template>
    <nav class="bg-chatbot-white p-6">
        <div class="flex max-w-full items-center justify-between">
            <div class="flex items-center">
                <NuxtImg preload src="/img/logo.png" width="60" />
                <NuxtLink v-t="'titles.chatbot'" to="/" class="grow pl-4 text-xl font-bold text-chatbot-font" />
            </div>
            <div class="hidden items-center md:flex">
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
            <div class="md:hidden">
                <button class="block text-gray-500 hover:text-chatbot-red focus:outline-none" @click="toggleMenu">
                    <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
        <div v-if="showMenu" class="md:hidden">
            <div class="flex flex-col items-center">
                <NuxtLinkLocale
                    v-t="'titles.home'"
                    to="/"
                    class="block w-full px-4 py-2 text-center text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                />
                <NuxtLinkLocale
                    v-if="!authStatus"
                    v-t="'titles.signin'"
                    to="/signin"
                    class="block w-full px-4 py-2 text-center text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                />
                <NuxtLinkLocale
                    to="/chat"
                    class="block w-full px-4 py-2 text-center text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                    >{{ $t("titles.trychatbot") }}
                    <UIcon name="i-heroicons-arrow-up-right" />
                </NuxtLinkLocale>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            showMenu: false,
        };
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
    },
};
</script>
