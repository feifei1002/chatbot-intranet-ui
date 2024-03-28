<template class="h-screen w-screen">
    <div class="flex">
        <div
            class="dark: flex h-screen w-1/2 flex-col items-center justify-center bg-chatbot-black dark:bg-chatbot-dark-grey"
        >
            <p
                v-t="'index.about'"
                class="flex justify-around text-balance pt-6 text-center font-mono text-4xl font-bold text-chatbot-white"
            />
        </div>
        <div class="flex h-screen w-1/2 items-center justify-center bg-chatbot-red dark:bg-chatbot-dark-red">
            <div class="flex items-center justify-center pt-6">
                <NuxtImg src="/img/landingImage.png" />
            </div>
        </div>
        <div class="fixed bottom-0 left-0">
            <DarkMode></DarkMode>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
