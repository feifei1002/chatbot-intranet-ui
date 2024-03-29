<template>
    <div class="flex h-screen flex-col md:flex-row">
        <div class="flex h-1/2 w-full items-center justify-center bg-chatbot-black md:h-screen md:w-1/2">
            <p v-t="'index.about'" class="text-balance text-center font-mono text-4xl font-bold text-white"></p>
        </div>
        <div class="flex h-1/2 w-full items-center justify-center bg-chatbot-red md:h-screen md:w-1/2">
            <div class="flex items-center justify-center">
                <!-- Can adjust the width of the image  if necessary-->
                <NuxtImg src="/img/landingImage.png" />
            </div>
        </div>
    </div>
</template>
