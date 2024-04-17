<template>
    <div class="flex h-full">
        <!-- Collapsible sidebar -->
        <aside
            class="w-fit overflow-x-hidden overflow-y-scroll bg-amaranth-600 p-4 md:w-1/5 dark:bg-amaranth-800"
            :class="{ '!w-fit': !isSidebarOpen }"
        >
            <!-- Toggle button -->
            <button @click="toggleSidebar()">
                <span v-if="isSidebarOpen" class="text-4xl">&laquo;</span>
                <span v-else class="text-4xl">&raquo;</span>
            </button>

            <!-- Content inside the sidebar -->
            <div v-show="isSidebarOpen">
                <!-- New Chat Button -->
                <button
                    v-t="'chatbot.newchat'"
                    class="mt-4 w-full cursor-pointer rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-white dark:hover:bg-black dark:hover:text-white"
                    @click="newChat"
                />
                <!-- Output previous conversations -->
                <ConversationHistory v-if="authStatus !== 'unauthenticated'" ref="conversationHistory" />
                <span
                    v-else
                    v-t="'chatbot.history_login'"
                    class="mt-2 block w-full text-center text-xl text-white"
                ></span>
            </div>
        </aside>

        <!-- Main content -->
        <div class="flex w-full flex-col bg-chatbot-white px-1 pb-1 pt-4 dark:bg-chatbot-font">
            <!-- Add your chatbot content here -->
            <div class="flex h-full flex-col overflow-y-scroll">
                <!-- Chat messages -->
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
                        <FeedbackButtons
                            v-if="message.role === 'assistant' && message.id"
                            :id="message.id"
                            :content="message.content"
                        />
                        <TTSResponse :content="message.content" />
                    </div>
                </div>
                <!-- Suggested questions -->
                <SuggestedQuestions
                    ref="suggestedQuestions"
                    :chat-messages="chatMessages"
                    @ask-to-chat-bot="submitQuestion"
                />
            </div>

            <!-- Text area for input -->
            <div class="relative mx-1">
                <textarea
                    ref="userMessageTextarea"
                    v-model="userMessage"
                    :placeholder="$t('chatbot.message')"
                    class="h-fit min-h-20 w-full rounded-md bg-amaranth-100 p-2 pr-32 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amaranth-500 dark:bg-chatbot-black dark:text-white dark:focus:text-white dark:focus:ring-chatbot-black"
                    @keydown.enter="handleShiftEnter"
                    @input="e => autoGrow(e.target)"
                />
                <div class="absolute right-2 top-1/2 flex -translate-y-1/2 items-center">
                    <speech-rec class="mr-2" @on-transcribed="text => (userMessage = text)" />
                    <button
                        v-t="'chatbot.send'"
                        :disabled="generating"
                        class="rounded-md bg-amaranth-500 px-4 py-2 text-white hover:bg-amaranth-600 focus:outline-none focus:ring-2 focus:ring-amaranth-500 focus:ring-offset-2 dark:bg-chatbot-red dark:text-white dark:hover:text-black"
                        @click="sendMessage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// get variables from nuxt.config.ts
const config = useRuntimeConfig();

import { fetchEventSource } from "@microsoft/fetch-event-source";

const route = useRoute();

const userMessageTextarea = ref(null);

const userMessage = ref("");
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

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
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
                            conversationHistory.value.refreshConversations();
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
        const { data: conversationHistory } = await useFetch(
            `${config.public.apiURL}/conversations/${inputConversationId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token.value,
                },
            },
        );
        return conversationHistory;
    } catch (error) {
        console.error("Error fetching conversation history: ", error);
    }
};

const chatMessages = conversationId.value ? await getConversationHistory(conversationId.value) : ref([]);

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
        }).then(resp => {
            resp.message_ids.forEach((messageId, index) => {
                chatMessages.value[chatMessages.value.length - 2 + index].id = messageId;
            });
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

const autoGrow = element => {
    element.style.height = "80px"; // needed to recalculate scrollHeight
    // set to the height of the content, but not more than half of the body height
    element.style.height = Math.min(Math.max(element.scrollHeight, 80), document.body.scrollHeight / 2) + "px";
};

const autoGrowFunction = () => {
    autoGrow(userMessageTextarea.value);
};

onMounted(() => {
    window.addEventListener("resize", autoGrowFunction);
});

onUnmounted(() => {
    window.removeEventListener("resize", autoGrowFunction);
});

onActivated(() => {
    if (needsRefresh.value) {
        location.reload();
    }
});
</script>
