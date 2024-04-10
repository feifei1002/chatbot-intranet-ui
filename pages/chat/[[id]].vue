<template>
    <div class="flex h-full">
        <!-- Blue side with 1/3 of the page -->
        <div class="flex w-1/5 flex-col bg-amaranth-600 p-4">
            <!-- New Chat Button -->
            <button
                v-t="'chatbot.newchat'"
                class="mt-4 cursor-pointer rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
                @click="newChat"
            />

            <!-- output previous conversations ordered by title (when authenticated user logged in) -->
            <ConversationHistory v-if="authStatus !== 'unauthenticated'" ref="conversationHistory" />
            <span v-else v-t="'chatbot.history_login'" class="mt-2 text-center text-xl text-white"></span>
        </div>
        <!-- Pink side with 3/4 of the page -->
        <div class="flex w-4/5 flex-col bg-chatbot-white p-1">
            <!-- Add your chatbot content here -->
            <div class="flex h-full flex-col overflow-y-scroll">
                <div
                    v-for="(message, index) in chatMessages"
                    :key="index"
                    class="mb-2 max-w-96 text-wrap break-words rounded p-1"
                    :class="{
                        'mr-1 self-end bg-amaranth-300 text-right text-black': message.role === 'user',
                        'self-start bg-gray-300 text-left text-black': message.role === 'assistant',
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
                <speech-rec @on-transcribed="text => (userMessage = text)" />
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
const config = useRuntimeConfig();

import { fetchEventSource } from "@microsoft/fetch-event-source";

const route = useRoute();
const userMessage = ref("");
const chatMessages = ref([]);
const suggestedQuestions = ref(null);

const conversationHistory = ref([]);

const generating = ref(false);

const { status: authStatus } = useAuth();

const conversationId = ref(route.params.id);
const needsRefresh = ref(false);

const newChat = () => {
    if (route.path !== "/chat") {
        navigateTo("/chat");
    }
    // url bar shows a conversation ID, but this instance is without one
    else if (needsRefresh.value) {
        location.href = "/chat";
    }
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

                if (authStatus.value === "authenticated") {
                    const isNewChat = !conversationId.value;

                    if (isNewChat) {
                        // if first question asked create new conversation
                        conversationId.value = await createConversation();

                        history.pushState(null, "", `/chat/${conversationId.value}`);

                        // reload the page on next new conversation, since this is
                        // still technically `/chat` withouth an ID
                        needsRefresh.value = true;
                    }

                    // send new messages to the server
                    addMessages(conversationId.value).then(() => {
                        if (isNewChat) {
                            // update conversation list of left
                            conversationHistory.value.getConversations();
                        }
                    });
                }

                // after assistant message is loaded get suggested questions
                suggestedQuestions.value.fetchSuggestedQuestions();
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

// returns conversation history for a given user and specific conversation ID
const getConversationHistory = async inputConversationId => {
    const { token } = useAuth();
    try {
        const conversationHistory = await $fetch(`${config.public.apiURL}/conversations/${inputConversationId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.value,
            },
        });
        chatMessages.value = conversationHistory;
    } catch (error) {
        console.error("Error fetching conversation history: ", error);
    }
};

if (conversationId.value) {
    await getConversationHistory(conversationId.value);
}

// adds the recent two messages to the tables
// if it's the first question to the chatbot, the title is updated in the database
const addMessages = async inputConversationId => {
    const { token } = useAuth();
    try {
        await $fetch(`${config.public.apiURL}/conversations/${inputConversationId}/add_messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.value,
            },
            body: {
                // only get the last 2 messages
                // chat_messages: props.chatMessages.slice(-2),
                chat_messages: chatMessages.value.slice(-2),
            },
        });
    } catch (error) {
        console.error("Error adding to conversation history: ", error);
    }
};

// sends question clicked to the chatBot
const submitQuestion = question => {
    // sets value of user message, so it gets submitted to chatBot
    userMessage.value = question;
    sendMessage();
};

const handleShiftEnter = event => {
    // if enter key pressed but not alongside the shift key
    if (event.key === "Enter" && !event.shiftKey) {
        // sends message to chatbot
        sendMessage();
        event.preventDefault();
    }
};

onActivated(() => {
    if (needsRefresh.value) {
        location.reload();
    }
});
</script>
