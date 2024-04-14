<template>
    <div class="flex h-3/5 w-full flex-col bg-chatbot-white px-1 pb-1 pt-4 dark:bg-chatbot-font">
        <div class="flex justify-center text-2xl font-bold text-black dark:text-white">
            <h2>Admin Chatbot</h2>
        </div>
        <div class="flex h-full flex-col overflow-y-scroll">
            <div
                v-for="(message, index) in chatMessages"
                :key="index"
                class="mb-2 max-w-xl text-wrap break-words rounded p-1"
                :class="{
                    'mr-1 self-end bg-amaranth-300 text-right text-black dark:bg-amaranth-800 dark:text-white':
                        message.role === 'user',
                    'self-start bg-gray-300 text-left text-black': message.role === 'assistant',
                }"
            >
                <MarkdownRenderer :content="message.content" />
                <div class="flex items-center justify-end gap-x-1">
                    <CopyButton :content="message.content" />
                    <TTSResponse :content="message.content" />
                </div>
            </div>
        </div>
        <div class="mb-2 flex justify-center">
            <div class="flex w-full justify-around space-x-2">
                <button
                    v-for="(question, index) in randomQuestions"
                    :key="index"
                    class="rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700"
                    @click="
                        adminQuestion = question;
                        sendQuestion();
                    "
                >
                    {{ question }}
                </button>
            </div>
        </div>
        <div class="relative mx-1">
            <!-- Circular Rectangle Box at the bottom -->
            <textarea
                v-model="adminQuestion"
                :placeholder="$t('chatbot.message')"
                class="h-fit min-h-20 w-full rounded-md bg-amaranth-100 p-2 pr-32 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amaranth-500 dark:bg-chatbot-black dark:text-chatbot-white dark:focus:text-chatbot-white dark:focus:ring-chatbot-black"
                @keydown.enter="handleShiftEnter"
            ></textarea>
            <div class="absolute right-2 top-1/2 flex -translate-y-1/2 items-center">
                <button
                    v-t="'chatbot.send'"
                    class="rounded-md bg-amaranth-500 px-4 py-2 text-white hover:bg-amaranth-600 focus:outline-none focus:ring-2 focus:ring-amaranth-500 focus:ring-offset-2 dark:bg-chatbot-red dark:text-white dark:hover:text-black"
                    :disabled="generating"
                    @click="sendQuestion"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { preMadeQuestions } from "~/composables/preMadeQuestions.js";

const adminQuestion = ref("");
const chatMessages = ref([]);
const generating = ref(false);
const randomQuestions = ref("");
onMounted(() => {
    newChat();
    randomQuestions.value = getRandomQuestions();
});
const newChat = () => {
    chatMessages.value = [];
};

const sendQuestion = () => {
    const question = adminQuestion.value.trim();
    if (question !== "") {
        generating.value = true;
        // set array of suggested questions to zero, to hide template in SuggestedQuestions during response generation

        // add user message
        chatMessages.value.push({ content: question, role: "user" });
        adminQuestion.value = "";

        // add assistant message
        const assistantMessage = ref("");
        chatMessages.value.push({ content: assistantMessage, role: "assistant" });

        const { token } = useAuth();

        fetchEventSource(`${config.public.apiURL}/admin_chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // add authorization header if token is present
                ...(token.value && { Authorization: token.value }),
            },
            body: JSON.stringify({
                // everything but last two messages, since they're the ones we're generating
                previous_messages: chatMessages.value.slice(0, -2),
                question: question,
            }),
            onclose: () => {
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
                alert("An error occurred while generating the response");
                generating.value = false;
                // throw the error, so that we don't retry the request
                throw error;
            },
        });
    }
};

const getRandomQuestions = () => {
    const randomQuestions = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * preMadeQuestions.length);
        randomQuestions.push(preMadeQuestions[randomIndex]);
        preMadeQuestions.splice(randomIndex, 1);
    }
    return randomQuestions;
};

const handleShiftEnter = event => {
    // if enter key pressed but not alongside the shift key
    if (event.key === "Enter" && !event.shiftKey) {
        // sends message to chatbot
        sendQuestion();
        event.preventDefault();
    }
};
</script>
