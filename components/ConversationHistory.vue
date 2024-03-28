<template>
    <div
        v-for="(conversation, index) in conversations"
        :key="index"
        class="mt-4 flex cursor-pointer items-center justify-between rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
        @click="getConversationHistory(conversation.id)"
    >
        {{ conversation.title }}
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
// const titleVal = ref([]);
const conversations = ref([]);
const { token } = useAuth();

const props = defineProps({
    chatMessages: {
        type: Array,
        default: () => [],
    },
});

// const fetchTitle = async () => {
//     // post request to get a title based on the conversation
//     const convoTitle = await $fetch(`${config.public.apiURL}/store_conversation`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token.value && { Authorization: token.value }),
//         },
//         body: {
//             chat_messages: props.chatMessages,
//         },
//     });
//
//     try {
//         // gets value of the title from the array
//         titleVal.value = convoTitle.title;
//     } catch {
//         // cannot get array of title
//         console.log("error getting json array");
//     }
// };

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
        console.log("conv id is ", conv_id.conversation_id);
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
    console.log(conversations);
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
    console.log("history is: ", conversationHistory);
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

defineExpose({
    // fetchTitle,
    newConversation,
    getConversations,
    deleteConversation,
    addMessages,
});
</script>

<style scoped></style>
