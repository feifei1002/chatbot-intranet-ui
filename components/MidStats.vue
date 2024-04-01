<template>
    <div class="relative mr-8 size-64 grow rounded bg-chatbot-white p-12">
      <span class="absolute left-0 top-0 inline-block w-full rounded-t bg-gray-300 py-2 text-xs font-semibold uppercase text-black">
        {{ statTitle }}
      </span>
      <!-- Use slot to include the LineChart component -->
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    statTitle: {
      type: String,
      required: true
    }
  });
  </script>
  