<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const currentPathObject = router.currentRoute.value;
console.log(currentPathObject.fullPath);

const { status } = useAuth();
const authStatus = ref(status.value === "authenticated");
watch(status, newStatus => {
    authStatus.value = newStatus === "authenticated";
});
</script>

<template class="">
    <nav class="bg-navbar-blue p-6">
        <div class="container flex items-center">
            <img src="/img/logo.png" width="60em" />
            <a href="/" class="w-3/4 pl-4 text-xl font-bold text-white">{{ $t("chatbot") }}</a>
            <div class="absolute right-0 flex w-1/4 justify-between pr-6">
                <a
                    href="/"
                    class="text-xl font-semibold"
                    :class="{
                        'text-chatbot-pink': currentPathObject.fullPath == '/',
                        'text-white': currentPathObject.fullPath != '/',
                    }"
                    >{{ $t("home") }}</a
                >
                <a
                    v-if="!authStatus"
                    href="signin"
                    class="text-xl font-semibold"
                    :class="{
                        'text-chatbot-pink': currentPathObject.fullPath == '/signin',
                        'text-white': currentPathObject.fullPath != '/signin',
                    }"
                    >{{ $t("signin") }}</a
                >
                <a
                    href="chat"
                    class="text-xl font-semibold"
                    :class="{
                        'text-chatbot-pink': currentPathObject.fullPath == '/chat',
                        'text-white': currentPathObject.fullPath != '/chat',
                    }"
                    >{{ $t("trychatbot") }}
                    <Icon name="material-symbols:arrow-outward" />
                </a>
            </div>
        </div>
    </nav>
</template>
