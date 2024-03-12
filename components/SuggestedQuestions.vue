<template>
    <!-- class used for styling, using tailwind indigo used to match the UI of the chatbot's conversation-->
    <p class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white">
        Suggested questions you could ask:
    </p>
    <!-- hovering the button makes the background colour lighter -->
    <!-- each button is each question of the array of 3 questions -->
    <button
        type="submit"
        class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"
        @click="$emit('askToChatBot', questionArray[0])"
    >
        {{ questionArray[0] }}</button
    ><br />
    <button
        type="submit"
        class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"
        @click="$emit('askToChatBot', questionArray[1])"
    >
        {{ questionArray[1] }}</button
    ><br />
    <button
        type="submit"
        class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"
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
