<template>
    <div class="relative mr-8 h-80 w-64 grow rounded bg-chatbot-white p-12">
        <!-- Grey background -->
        <span class="absolute left-0 top-0 z-0 inline-block w-full rounded-t bg-gray-300 py-3"> </span>

        <!-- Span for the text -->
        <span class="absolute left-2 top-1 z-10 text-xs font-bold uppercase text-black">
            {{ statTitle }}
        </span>

        <!-- Use slot to include the LineChart component -->
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    statTitle: {
        type: String,
        required: true,
    },
});
</script>
