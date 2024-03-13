<template>
    <div v-if="questionArray">
        <!-- class used for styling, using tailwind's pink used to match the UI of the chatbot's conversation-->
        <p class="mb-2 max-w-96 text-wrap break-words rounded p-1 text-left text-pink-200">
            Ask a follow up question...
        </p>
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
    </div>

    <!--    <p>{{ chatMessages }}</p>-->
</template>
<script setup>
const config = useRuntimeConfig();
// suggested questions to ask
const questionArray = ref("");
// prop to take array of questions form parent chat.vue
const props = defineProps({
    chatMessages: {
        type: Array,
        default: () => [],
    },
    // generatingVal: {
    //     type: Boolean,
    //     default: false,
    // },
});
const messages = ref(props.chatMessages);
// const gen = ref(props.generatingVal);

// emit to call function 'askClickedQuestionToChatBot' from parent chat.vue
defineEmits(["askToChatBot"]);

// watch for changes with message history
watch(
    messages,
    async (newMessages, oldMessages) => {
        // when message history changes, when finished updating with assistant response, do this:
        // if statement below doesn't work, need to fix
        if (newMessages.length > oldMessages.length) {
            // new messages added
            console.log("get suggested qs");

            // post request to /suggested
            // sends chat messages in post request
            // returns json array (jsonSent) of 3 questions in key 'questions'
            const { data: jsonSent, error } = await useFetch(`${config.public.apiURL}/suggested`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_messages: messages.value,
                }),
            });

            // exception handling for if valid response from post request
            try {
                // gets array of questions from key 'questions'
                questionArray.value = jsonSent.value.questions;
            } catch {
                // failed request
                console.log("error getting json array: ", error.data.message);
            }
        }
    },
    {
        // deep is true because array is being watched
        deep: true,
    },
);
</script>
