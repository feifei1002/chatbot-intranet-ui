<template>
    <div v-for="(conversation, index) in conversations" :key="index">
        <button
            class="mt-4 cursor-pointer rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
        >
            {{ conversation.title }}
        </button>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const titleVal = ref([]);
const conversations = ref([]);
const { token } = useAuth();

const props = defineProps({
    chatMessages: {
        type: Array,
        default: () => [],
    },
});

const fetchTitle = async () => {
    // post request to get a title based on the conversation
    const convoTitle = await $fetch(`${config.public.apiURL}/store_conversation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token.value && { Authorization: token.value }),
        },
        body: {
            chat_messages: props.chatMessages,
        },
    });

    try {
        // gets value of the title from the array
        titleVal.value = convoTitle.title;
    } catch {
        // cannot get array of title
        console.log("error getting json array");
    }
};

const newConversation = async () => {
    try {
        // Post request to create new conversation for authenticated user
        await $fetch(`${config.public.apiURL}/conversations/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token.value && { Authorization: token.value }),
            },
        });
    } catch (error) {
        // Handle errors here
        console.error("Error fetching conversation message:", error);
    }
};

// calling functions from backend - will use and update asap

// get_conversations
const getConversations = async () => {
    conversations.value = await $fetch(`${config.public.apiURL}/conversations`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token.value && { Authorization: token.value }),
        },
    });
    console.log(conversations.value);
};

// get_conversation_history
const getConversationHistory = async inputConversationId => {
    const conversationHistory = await $fetch(`${config.public.apiURL}/conversations/${inputConversationId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token.value && { Authorization: token.value }),
        },
    });
    console.log(conversationHistory);
};

// add_messages
const addMessages = async inputConversationId => {
    const isTitleUpdated = await $fetch(`${config.public.apiURL}/conversations/${inputConversationId}/add_messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token.value && { Authorization: token.value }),
        },
        body: {
            // currently for all chat messages so will need to change to the new chat messages only
            chat_messages: props.chatMessages,
        },
    });
    console.log(isTitleUpdated);
};

// delete_conversation
const deleteConversation = async inputConversationId => {
    const isConversationDeleted = await $fetch(`${config.public.apiURL}/conversations/${inputConversationId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(token.value && { Authorization: token.value }),
        },
    });
    console.log(isConversationDeleted);
};

defineExpose({
    fetchTitle,
    newConversation,
    getConversations,
});
</script>

<style scoped></style>
