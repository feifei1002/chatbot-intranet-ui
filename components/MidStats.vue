<template>
  <div class="relative mr-8 size-64 grow rounded bg-chatbot-white p-12">
    <!-- Span for the text -->
    <span class="absolute left-2 top-1  text-xs font-bold uppercase text-black z-10">
      {{ statTitle }}
    </span>

    <!-- Grey background -->
    <span class="absolute left-0 top-0 inline-block w-full rounded-t bg-gray-300 py-3 z-0">
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
  