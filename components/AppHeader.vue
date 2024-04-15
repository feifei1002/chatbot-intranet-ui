<script setup>
const { status, signOut } = useAuth();
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

const showMenu = ref(false);

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const logout = async () => {
    // use signIn function built into useAuth,
    // send the user to the homepage after
    await signOut({ callbackUrl: "/" });
};
</script>

<template>
    <nav class="bg-chatbot-white p-6 drop-shadow-lg dark:bg-chatbot-black">
        <div class="container flex items-center">
            <NuxtImg preload src="/img/logo.png" width="60" />
            <NuxtLink
                v-t="'titles.chatbot'"
                to="/"
                class="w-3/4 pl-4 text-xl font-bold text-chatbot-font dark:text-chatbot-white"
            />
            <div class="absolute right-0 flex w-1/3 justify-between pr-6">
                <form class="flex">
                    <select
                        id="locale-select"
                        v-model="$i18n.locale"
                        class="border-2 border-solid border-black bg-white text-chatbot-red dark:border-chatbot-white dark:bg-chatbot-black dark:text-chatbot-white"
                    >
                        <option value="en">en</option>
                        <option value="cy">cy</option>
                        <option value="ko">ko</option>
                    </select>
                </form>
                <DarkMode></DarkMode>
                <NuxtLinkLocale
                    v-t="'titles.home'"
                    to="/"
                    class="text-xl font-semibold text-chatbot-font dark:text-chatbot-white"
                    exact-active-class="!text-chatbot-red"
                />
                <NuxtLinkLocale
                    v-if="!authStatus"
                    v-t="'titles.signin'"
                    to="/signin"
                    class="px-4 text-xl font-semibold text-chatbot-font"
                    exact-active-class="!text-chatbot-red"
                />
                <!-- sign out shows when signed in -->
                <NuxtLinkLocale
                    v-if="authStatus"
                    v-t="'titles.signout'"
                    class="cursor-pointer text-xl font-semibold text-chatbot-font hover:text-chatbot-red dark:text-chatbot-white dark:hover:text-chatbot-red"
                    @click="logout()"
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
