<template>
    <div class="flex h-full">
        <!-- Blue side with 1/3 of the page -->
        <div class="flex w-1/5 flex-col bg-indigo-950 p-4">
            <!-- New Chat Button -->
            <button
                class="mt-4 cursor-pointer rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
                @click="newChat"
            >
                New Chat
            </button>
        </div>
        <!-- Pink side with 3/4 of the page -->
        <div class="flex w-4/5 flex-col bg-pink-500 p-1">
            <!-- Add your chatbot content here -->
            <div class="flex h-full flex-col overflow-y-scroll">
                <div
                    v-for="(message, index) in chatMessages"
                    :key="index"
                    class="mb-2 max-w-96 text-wrap break-words rounded p-1"
                    :class="{
                        'mr-1 self-end bg-pink-600 text-right': message.role === 'user',
                        'self-start bg-indigo-900 text-left text-white': message.role === 'assistant',
                    }"
                >
                    <MarkdownRenderer :content="message.content" />
                </div>

                <!-- suggested qs output here -->
                <div v-if="questionArray">
                    <SuggestedQuestions :question-array="questionArray" @send="askClickedQuestionToChatBot" />
                </div>
                <!-- end of suggestion qs -->
            </div>

            <div class="flex justify-end">
                <!-- Circular Rectangle Box at the bottom -->
                <textarea
                    v-model="userMessage"
                    placeholder="Message the ChatBot..."
                    class="box-border h-20 w-full resize-none rounded-2xl border-2 border-black bg-transparent p-5 outline-none"
                    style="color: rgb(6, 5, 5)"
                ></textarea>

                <button
                    class="h-20 cursor-pointer rounded-md border-2 border-black px-2 py-7 hover:bg-white hover:text-[#353955]"
                    :disabled="generating"
                    @click="sendMessage"
                >
                    Send
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import SuggestedQuestions from "~/components/SuggestedQuestions.vue";

const config = useRuntimeConfig();

import { fetchEventSource } from "@microsoft/fetch-event-source";

const userMessage = ref("");
const chatMessages = ref([]);

// suggested questions to ask
const questionArray = ref("");

const generating = ref(false);

const newChat = () => {
    chatMessages.value = [];
};

const sendMessage = () => {
    const message = userMessage.value.trim();
    if (message !== "") {
        generating.value = true;

        // empties suggested questions at the start of response generation
        // so doesn't clutter screen when generating a response
        questionArray.value = "";

        // add user message
        chatMessages.value.push({ content: message, role: "user" });
        userMessage.value = "";

        // add assistant message
        const assistantMessage = ref("");
        chatMessages.value.push({ content: assistantMessage, role: "assistant" });

        fetchEventSource(`${config.public.apiURL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // everything but last two messages, since they're the ones we're generating
                previous_messages: chatMessages.value.slice(0, -2),
                question: message,
            }),
            onclose: () => {
                // after assistant message is loaded ask for suggested questions
                returnSuggestedQuestionsArray();
                generating.value = false;
            },
            onmessage: event => {
                console.log("Message:", event);
                // we can get empty messages, so we need to check if there's data
                if (event.data) {
                    const data = JSON.parse(event.data);
                    if (data.text) {
                        // add the text to the assistant message
                        assistantMessage.value += data.text;
                    }
                }
            },
            onerror: error => {
                console.error("Error:", error);
                alert("An error occurred while genering the response");
                generating.value = false;
                // throw the error, so that we don't retry the request
                throw error;
            },
        });
    }
};

// gets questions from backend and set variables to them
const returnSuggestedQuestionsArray = async () => {
    // post request to /suggested
    // sends chat messages in post request
    // returns json array (jsonSent) of 3 questions in key 'questions'
    const { data: jsonSent, error } = await useFetch(`${config.public.apiURL}/suggested`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_messages: chatMessages.value,
        }),
    });

    // error handling for if valid response from post request
    if (jsonSent.value) {
        // parses value as json
        const obj = JSON.stringify(jsonSent.value);
        const jsonObj = JSON.parse(obj);

        // gets array of questions from key 'questions'
        questionArray.value = jsonObj.questions;
    } else {
        // failed request
        console.log("error: ", error.data.message);
    }
};

// sends question clicked to the chatBot
function askClickedQuestionToChatBot(chosen) {
    // sets value of user message, so it gets submitted to chatBot
    userMessage.value = chosen;
    sendMessage();
}
</script>
