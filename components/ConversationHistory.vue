<template>
    <!-- lists each conversation in reverse order, displaying the title -->
    <div
        v-for="(conversation, index) in reversedConversations"
        :key="index"
        class="mt-4 flex cursor-pointer items-center justify-between rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
        @click="handleTitleClick(conversation)"
    >
        {{ conversation.title }}
        <!-- icon to allow the conversation to be deleted by clicking and calling deleteConversation(ID) -->
        <UButton
            icon="i-heroicons-trash-16-solid"
            size="2xs"
            color="black"
            square
            variant="ghost"
            title="Click to delete the conversation"
            @click="deleteConversation(conversation.id)"
        />
    </div>
</template>

<script setup>
const config = useRuntimeConfig();

const conversations = ref([]);
const { token } = useAuth();

// gets chat messages array as prop from parent chat.vue
const props = defineProps({
    chatMessages: {
        type: Array,
        default: () => [],
    },
});

// emit to call parent function
const emit = defineEmits(["showHistory", "conversation-selected"]);

// create new conversation for a given authenticated user
const newConversation = async () => {
    try {
        // Post request to create new conversation for authenticated user
        const conv_id = await $fetch(`${config.public.apiURL}/conversations/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token.value && { Authorization: token.value }),
            },
        });
        return conv_id.conversation_id[0];
    } catch (error) {
        // Handle errors here
        console.error("Error fetching conversation message: ", error);
    }
};

// returns conversations to update the left panel of titles to click
const getConversations = async () => {
    try {
        // sets 'conversations' to values from get request
        conversations.value = await $fetch(`${config.public.apiURL}/conversations`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token.value && { Authorization: token.value }),
            },
        });
    } catch (error) {
        console.error("Error fetching conversations: ", error);
    }
};

// returns conversation history for a given user and specific conversation ID
const getConversationHistory = async inputConversationId => {
    try {
        const conversationHistory = await $fetch(`${config.public.apiURL}/conversations/${inputConversationId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token.value && { Authorization: token.value }),
            },
        });
        // posts history to the page using parent function
        emit("showHistory", conversationHistory);
    } catch (error) {
        console.error("Error fetching conversation history: ", error);
    }
};

// adds the recent two messages to the tables
// if it's the first question to the chatbot, the title is updated in the database
const addMessages = async inputConversationId => {
    try {
        const isTitleUpdated = await $fetch(
            `${config.public.apiURL}/conversations/${inputConversationId}/add_messages`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token.value && { Authorization: token.value }),
                },
                body: {
                    // only get the last 2 messages
                    chat_messages: props.chatMessages.slice(-2),
                },
            },
        );
        console.log(isTitleUpdated);
    } catch (error) {
        console.error("Error adding to conversation history: ", error);
    }
};

// deletes the conversation in the database
const deleteConversation = async inputConversationId => {
    // popup window to confirm the user's choice
    if (window.confirm("Are you sure you want to delete this conversation?")) {
        const isConversationDeleted = await $fetch(`${config.public.apiURL}/conversations/${inputConversationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token.value && { Authorization: token.value }),
            },
        });
        if (isConversationDeleted) {
            // Remove the deleted conversation from the conversations array
            conversations.value = conversations.value.filter(conversation => conversation.id !== inputConversationId);
        }
        console.log(isConversationDeleted);
    }
};

// when clicking a title, sets the conversation ID to the correct one for the conversation
const handleTitleClick = conversation => {
    getConversationHistory(conversation.id);
    emit("conversation-selected", conversation.id);
};

// reverse the order of titles to show recent conversations at the top
const reversedConversations = computed(() => {
    return [...conversations.value].reverse();
});

defineExpose({
    newConversation,
    getConversations,
    deleteConversation,
    addMessages,
});
</script>

<style scoped></style>
