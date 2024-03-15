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
    <nav class="bg-chatbot-white p-6">
        <div class="container flex items-center">
            <img src="/img/logo.png" width="60em" />
            <a href="#" class="w-3/4 pl-4 text-xl font-bold text-chatbot-font">Chatbot</a>
            <div class="absolute right-0 flex w-1/4 justify-between pr-6">
                <a
                    href="/"
                    class="text-xl font-semibold"
                    :class="{
                        'text-chatbot-red': currentPathObject.fullPath == '/',
                        'text-chatbot-font': currentPathObject.fullPath != '/',
                    }"
                    >Home</a
                >
                <a
                    v-if="!authStatus"
                    href="signin"
                    class="text-xl font-semibold"
                    :class="{
                        'text-chatbot-red': currentPathObject.fullPath == '/signin',
                        'text-chatbot-font': currentPathObject.fullPath != '/signin',
                    }"
                    >Sign In</a
                >
                <a
                    href="chat"
                    class="text-xl font-semibold"
                    :class="{
                        'text-chatbot-red': currentPathObject.fullPath == '/chat',
                        'text-chatbot-font': currentPathObject.fullPath != '/chat',
                    }"
                    >Try Chatbot
                    <Icon name="material-symbols:arrow-outward" />
                </a>
            </div>
        </div>
    </nav>
</template>
