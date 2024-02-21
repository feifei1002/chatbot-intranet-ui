<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
let currentPathObject = router.currentRoute.value; 
console.log(currentPathObject.fullPath);
</script>

<template class="">
    <nav class=" bg-navbar-blue p-6">
        <div class="container flex">
            <div>
                <a href="#" class="text-xl font-bold text-white">Chatbot</a>
            </div>
            <div>
                <a href="/" class="text-xl font-semibold"
                    :class="{ 'text-chatbot-pink': currentPathObject.fullPath == '/', 'text-white': currentPathObject.fullPath != '/' }">Home</a>
            </div>
            <div>
                <a href="signin" class="text-xl font-semibold"
                    :class="{ 'text-chatbot-pink': currentPathObject.fullPath == '/signin', 'text-white': currentPathObject.fullPath != '/signin' }">Sign In</a>
            </div>
            <div>
                <a href="chat" class="text-xl font-semibold"
                    :class="{ 'text-chatbot-pink': currentPathObject.fullPath == '/chat', 'text-white': currentPathObject.fullPath != '/chat' }">Try Chatbot {{ aaaaa }}</a>
        </div>
    </div>
</nav></template>