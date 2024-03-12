<template>
    <!--        <div v-if="questionArr">-->
    <!--            class used for styling, using tailwind indigo used to match the UI of the chatbot's conversation-->
    <p class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white">
        Suggested questions you could ask:
    </p>
    <!-- hovering the button makes the background colour lighter -->
    <button
        type="submit"
        class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"
        @click="$emit('send', questionOne)"
    >
        {{ questionOne }}</button
    ><br />
    <!--    <button-->
    <!--        type="submit"-->
    <!--        class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"-->
    <!--        @click="handleSubmitQuestionClicked(questionTwo)"-->
    <!--    >-->
    <!--        {{ questionTwo }}</button-->
    <!--    ><br />-->
    <!--    <button-->
    <!--        type="submit"-->
    <!--        class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"-->
    <!--        @click="handleSubmitQuestionClicked(questionThree)"-->
    <!--    >-->
    <!--        {{ questionThree }}-->
    <!--    </button>-->
</template>
<script setup>
const props = defineProps({
    questionOne: {
        type: String,
        default: "",
    },
    questionTwo: {
        type: String,
        default: "",
    },
    questionThree: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["send"]);

// gets question clicked
const handleSubmitQuestionClicked = questionClicked => {
    try {
        console.log("clicked: ", questionClicked);

        // now send questions to chatbot

        // cant do below line because in chat.vue
        sendMessage();
    } catch {
        console.log("Error when clicking a question");
    }
};
</script>
