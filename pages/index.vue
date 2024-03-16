<template class="h-screen w-screen">
    <div class="flex">
        <div class="flex h-screen w-1/2 items-center justify-center bg-chatbot-blue">
            <p
                v-t="'index.about'"
                class="flex justify-around text-balance pt-6 text-center font-mono text-4xl font-bold text-chatbot-pink"
            />
        </div>
        <div class="flex h-screen w-1/2 items-center justify-center bg-chatbot-pink">
            <div class="flex items-center justify-center pt-6">
                <img src="/img/landingImage.png" />
            </div>
        </div>
    </div>
</template>
