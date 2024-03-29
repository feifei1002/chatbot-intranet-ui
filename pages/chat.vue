<template>
    <div class="flex h-full">
        <!-- Blue side with 1/3 of the page -->
        <div class="flex w-1/5 flex-col bg-indigo-950 p-4">
            <!-- New Chat Button -->
            <button
                v-t="'chatbot.newchat'"
                class="mt-4 cursor-pointer rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
                @click="newChat"
            />

            <ConversationHistory
                ref="conversationHistory"
                :chat-messages="chatMessages"
                @show-history="setChatMessages"
                @conversation-selected="handleConversationSelected"
            />
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
                    <CopyButton :content="message.content" />
                    <TTSResponse :content="message.content" />
                </div>

                <!-- suggested qs output here -->
                <SuggestedQuestions
                    ref="suggestedQuestions"
                    :chat-messages="chatMessages"
                    @ask-to-chat-bot="submitQuestion"
                />
                <!-- end of suggestion qs -->
            </div>

            <div class="flex justify-end">
                <!-- Circular Rectangle Box at the bottom -->
                <textarea
                    v-model="userMessage"
                    :placeholder="$t('chatbot.message')"
                    class="box-border flex h-20 w-full resize-none justify-end rounded-2xl border-2 border-black bg-transparent p-5 outline-none"
                    style="color: rgb(6, 5, 5)"
                    @keydown.enter="handleShiftEnter"
                ></textarea>

                <button
                    v-t="'chatbot.send'"
                    class="h-20 cursor-pointer rounded-md border-2 border-black px-2 py-7 hover:bg-white hover:text-[#353955]"
                    :disabled="generating"
                    @click="sendMessage"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
// get variables from nuxt.config.ts
import ConversationHistory from "~/components/ConversationHistory.vue";

const config = useRuntimeConfig();

import { fetchEventSource } from "@microsoft/fetch-event-source";

const userMessage = ref("");
const chatMessages = ref([]);

const suggestedQuestions = ref(null);
const conversationHistory = ref([]);
// const conversations = ref(null);
const currentConversationId = ref(null);

const generating = ref(false);

onMounted(async () => {
    conversationHistory.value.getConversations();
});

const newChat = async () => {
    // clears all chat history from the screen, including suggested questions
    chatMessages.value = [];
    suggestedQuestions.value.clear();

    // not needed below code anymore because checks conversation length in sendMessage
    // // create the new conversation by inserting username into conversations table
    // currentConversationId.value = await conversationHistory.value.newConversation();
    // // once created new conversation update left panel of conversations
    // conversationHistory.value.getConversations();
};

const sendMessage = () => {
    const message = userMessage.value.trim();
    if (message !== "") {
        generating.value = true;

        // set array of suggested questions to zero, to hide template in SuggestedQuestions during response generation
        suggestedQuestions.value.clear();

        // add user message
        chatMessages.value.push({ content: message, role: "user" });
        userMessage.value = "";

        // add assistant message
        const assistantMessage = ref("");
        chatMessages.value.push({ content: assistantMessage, role: "assistant" });

        const { token } = useAuth();

        fetchEventSource(`${config.public.apiURL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // add authorization header if token is present
                ...(token.value && { Authorization: token.value }),
            },
            body: JSON.stringify({
                // everything but last two messages, since they're the ones we're generating
                previous_messages: chatMessages.value.slice(0, -2),
                question: message,
            }),
            onclose: async () => {
                generating.value = false;

                if (chatMessages.value.length === 2) {
                    // if first question asked create new conversation
                    currentConversationId.value = await conversationHistory.value.newConversation();
                    // update left panel of conversations
                    conversationHistory.value.getConversations();
                }

                // after assistant message is loaded get suggested questions
                suggestedQuestions.value.fetchSuggestedQuestions();

                // add new messages to tables
                conversationHistory.value.addMessages(currentConversationId.value);
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

// sends question clicked to the chatBot
const submitQuestion = question => {
    // sets value of user message, so it gets submitted to chatBot
    userMessage.value = question;
    sendMessage();
};

const setChatMessages = messages => {
    // outputs the chat history for the chosen conversation to the page
    chatMessages.value = messages;
};

// fetch the id of current conversation to add in new messages
const handleConversationSelected = conversationId => {
    currentConversationId.value = conversationId;
};

const handleShiftEnter = event => {
    // if enter key pressed but not alongside the shift key
    if (event.key === "Enter" && !event.shiftKey) {
        // sends message to chatbot
        sendMessage();
        event.preventDefault();
    }
};
</script>
