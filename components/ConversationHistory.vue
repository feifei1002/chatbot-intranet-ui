<template>
    <!-- lists each conversation in reverse order, displaying the title -->
    <div
        v-for="(conversation, index) in conversations"
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
const { token } = useAuth();
const router = useRouter();

// emit to call parent function
const emit = defineEmits(["conversation-selected"]);

// returns conversations to update the left panel of titles to click
const getConversations = async () => {
    try {
        // sets 'conversations' to values from get request
        const { data } = await useFetch(`${config.public.apiURL}/conversations`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.value,
            },
            // reverse the order of titles to show recent conversations at the top
            transform: resp => resp.reverse(),
        });
        return data;
    } catch (error) {
        console.error("Error fetching conversations: ", error);
    }
};

const refreshConversations = async () => {
    conversations.value = (await getConversations()).value;
};

// deletes the conversation in the database
const deleteConversation = async inputConversationId => {
    // popup window to confirm the user's choice
    if (window.confirm("Are you sure you want to delete this conversation?")) {
        const isConversationDeleted = await $fetch(`${config.public.apiURL}/conversations/${inputConversationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.value,
            },
        });
        if (isConversationDeleted) {
            // Remove the deleted conversation from the conversations array
            conversations.value = conversations.value.filter(conversation => conversation.id !== inputConversationId);
        }
    }
};

defineExpose({
    refreshConversations,
    deleteConversation,
});

const conversations = await getConversations();

// when clicking a title, sets the conversation ID to the correct one for the conversation
const handleTitleClick = conversation => {
    router.push({ path: `/chat/${conversation.id}` });
    emit("conversation-selected", conversation.id);
};
</script>

<style scoped></style>
