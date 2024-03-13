<template>
    <!-- class used for styling, using tailwind's pink used to match the UI of the chatbot's conversation-->
    <p class="mb-2 max-w-96 text-wrap break-words rounded p-1 text-left text-pink-200">Ask a follow up question...</p>
    <!-- hovering the button makes the background colour slightly darker, and changes cursor to pointer -->
    <!-- each button is each question of the array of 3 questions -->
    <div v-for="question in questionArray" :key="question">
        <button
            type="submit"
            class="mb-2 max-w-96 cursor-pointer text-wrap break-words rounded border-2 border-pink-900 bg-pink-600 p-1 text-left text-pink-100 shadow-lg hover:bg-pink-700"
            @click="$emit('askToChatBot', question)"
        >
            {{ question }}</button
        ><br />
    </div>
</template>
<script setup>
// prop to take array of questions form parent chat.vue
defineProps({
    questionArray: {
        type: Array,
        default: () => [],
    },
});

// emit to call function 'askClickedQuestionToChatBot' from parent chat.vue
defineEmits(["askToChatBot"]);
</script>
