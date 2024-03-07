<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const currentPathObject = router.currentRoute.value;
console.log(currentPathObject.fullPath);
</script>

<template class="">
    <nav class="bg-navbar-blue p-6">
        <div class="container flex items-center">
            <img src="/img/logo.png" width="60em" />
            <a href="http://localhost:3000" class="w-3/4 pl-4 text-xl font-bold text-white">Chatbot</a>
            <div class="absolute right-0 flex w-1/4 justify-between pr-6">
                <a
                    href="/"
                    class="text-xl font-semibold"
                    :class="{
                        'text-chatbot-pink': currentPathObject.fullPath == '/',
                        'text-white': currentPathObject.fullPath != '/',
                    }"
                    >Home</a
                >
                <a
                    href="signin"
                    class="text-xl font-semibold"
                    :class="{
                        'text-chatbot-pink': currentPathObject.fullPath == '/signin',
                        'text-white': currentPathObject.fullPath != '/signin',
                    }"
                    >Sign In</a
                >
                <a
                    href="chat"
                    class="text-xl font-semibold"
                    :class="{
                        'text-chatbot-pink': currentPathObject.fullPath == '/chat',
                        'text-white': currentPathObject.fullPath != '/chat',
                    }"
                    >Try Chatbot
                    <Icon name="material-symbols:arrow-outward" />
                </a>
            </div>
        </div>
    </nav>
</template>
