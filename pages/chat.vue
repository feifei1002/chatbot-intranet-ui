<template>
    <div class="flex h-full">
        <!-- Blue side with 1/3 of the page -->
        <div class="flex w-1/5 flex-col bg-[#D73749] p-4">
            <!-- New Chat Button -->
            <button
                class="mt-4 cursor-pointer rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
                @click="newChat"
            >
                New Chat
            </button>
        </div>
        <!-- Pink side with 3/4 of the page -->
        <div class="flex w-4/5 flex-col bg-[#FEFFFE] p-1">
            <!-- Add your chatbot content here -->
            <div class="flex h-full flex-col overflow-y-scroll">
                <div
                    v-for="(message, index) in chatMessages"
                    :key="index"
                    class="mb-2 max-w-96 text-wrap break-words rounded p-1"
                    :class="{
                        'mr-1 self-end bg-red-300 text-right': message.role === 'user',
                        'self-start bg-pink-800 text-left': message.role === 'assistant',
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
                    v-model="userMessage"
                    placeholder="Message the ChatBot..."
                    class="box-border flex h-20 w-full resize-none justify-end rounded-2xl border-2 border-black bg-transparent p-5 outline-none"
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
// get variables from nuxt.config.ts
const config = useRuntimeConfig();

import { fetchEventSource } from "@microsoft/fetch-event-source";

const userMessage = ref("");
const chatMessages = ref([]);

const generating = ref(false);

const newChat = () => {
    chatMessages.value = [];
};

const sendMessage = () => {
    const message = userMessage.value.trim();
    if (message !== "") {
        generating.value = true;

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
                // sends chat history and returns suggested questions
                $fetch(`${config.public.apiURL}/suggested`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_messages: chatMessages.value,
                    }),
                });

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
