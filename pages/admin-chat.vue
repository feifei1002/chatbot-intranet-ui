<!--This might just be a temporary file for me to work on the frontend of the admin chatbot
while waiting for the admin page to be finished-->

<template>
    <div class="flex h-3/5 w-full flex-col bg-chatbot-font p-1">
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
                <CopyButton :content="message.content" />
                <TTSResponse :content="message.content" />
            </div>
        </div>
        <div class="flex justify-end">
            <!-- Circular Rectangle Box at the bottom -->
            <textarea
                v-model="adminQuestion"
                :placeholder="$t('chatbot.message')"
                class="box-border flex h-20 w-full resize-none justify-end rounded-2xl border-2 border-black bg-transparent p-5 outline-none"
                style="color: rgb(6, 5, 5)"
                @keydown.enter="handleShiftEnter"
            ></textarea>
            <div v-for="(question, index) in preMadeQuestions" :key="index">
                <button @click="adminQuestion = question">{{ question }}</button>
            </div>
            <button
                v-t="'chatbot.send'"
                class="h-20 cursor-pointer rounded-md border-2 border-black px-2 py-7 hover:bg-white hover:text-[#353955]"
                :disabled="generating"
                @click="sendQuestion"
            />
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();

import { fetchEventSource } from "@microsoft/fetch-event-source";

const adminQuestion = ref("");
const chatMessages = ref([]);
const generating = ref(false);
const preMadeQuestions = ref([
    "What are the top 10 most asked questions in general?",
    "What are the 5 most asked questions related to the University's website?",
    "What are the 5 most asked questions related to the student life?",
]);

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
                content: question,
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
</script>
