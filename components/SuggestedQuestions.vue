<template>
    <!-- class used for styling, using tailwind indigo used to match the UI of the chatbot's conversation-->

    <p class="btn mb-2 max-w-96 text-wrap break-words rounded p-1 text-left text-pink-200">
        Ask a follow up question...
    </p>
    <!-- hovering the button makes the background colour lighter -->
    <!-- each button is each question of the array of 3 questions -->
    <button
        type="submit"
        class="btn mb-2 max-w-96 cursor-pointer text-wrap break-words rounded border-2 border-pink-900 bg-pink-600 p-1 text-left text-pink-100 shadow-lg"
        @click="$emit('askToChatBot', questionArray[0])"
    >
        {{ questionArray[0] }}</button
    ><br />
    <button
        type="submit"
        class="btn mb-2 max-w-96 cursor-pointer text-wrap break-words rounded border-2 border-pink-900 bg-pink-600 p-1 text-left text-pink-100 shadow-lg"
        @click="$emit('askToChatBot', questionArray[1])"
    >
        {{ questionArray[1] }}</button
    ><br />
    <button
        type="submit"
        class="btn mb-2 max-w-96 cursor-pointer text-wrap break-words rounded border-2 border-pink-900 bg-pink-600 p-1 text-left text-pink-100 shadow-lg"
        @click="$emit('askToChatBot', questionArray[2])"
    >
        {{ questionArray[2] }}
    </button>
</template>
<script setup>
// props to take array of questions form parent chat.vue
const props = defineProps({
    questionArray: {
        type: Array,
        default: () => [],
    },
});

// emits to call function 'askClickedQuestionToChatBot' from parent chat.vue
const emit = defineEmits(["askToChatBot"]);
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
</style>
