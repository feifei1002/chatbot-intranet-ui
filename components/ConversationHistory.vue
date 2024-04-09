<template>
    <!--        v-if="conversations.length > 0"-->
    <!--        class="mt-4 flex items-center justify-between rounded-full border-2 border-white bg-transparent p-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"-->

    <div
        v-for="(conversation, index) in conversations"
        :key="index"
        class="mt-4 flex cursor-pointer items-center justify-between rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
        @click="handleTitleClick(conversation)"
    >
        <!-- list the titles from the database -->
        <!--        <div-->
        <!--            v-for="(conversation, index) in reversedConversations"-->
        <!--            :key="index"-->
        <!--            class="flex cursor-pointer items-center"-->
        <!--            @click="handleTitleClick(conversation)"-->
        <!--        >-->
        {{ conversation.title }}
        <!--        </div>-->

        <div class="flex items-center">
            <!-- icon to allow the conversation to be deleted by clicking and calling deleteConversation(ID) -->
            <UButton
                icon="i-heroicons-trash-16-solid"
                class="mr-2 p-2 hover:bg-white"
                size="2xs"
                color="black"
                square
                variant="ghost"
                title="Click to delete the conversation"
                @click="deleteConversation(conversation.id)"
            />
            <!-- icon to copy the link to share the conversation -->
            <UButton
                icon="i-heroicons-share-16-solid"
                class="p-2 hover:bg-white"
                size="2xs"
                color="black"
                square
                variant="ghost"
                title="Click to share the conversation"
                @click="shareConversation(conversation.id)"
            />
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const conversations = ref([]);
const { token } = useAuth();
const router = useRouter();

// emit to call parent function
const emit = defineEmits(["conversation-selected"]);

// returns conversations to update the left panel of titles to click
const getConversations = async () => {
    try {
        // sets 'conversations' to values from get request
        await $fetch(`${config.public.apiURL}/conversations`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.value,
            },
            // reverse the order of titles to show recent conversations at the top
        }).then(response => {
            conversations.value = response.reverse();
        });
    } catch (error) {
        console.error("Error fetching conversations: ", error);
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
                Authorization: token.value,
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
    router.push({ path: `/chat/${conversation.id}` });
    emit("conversation-selected", conversation.id);
};

// gets a link to share the conversation
const shareConversation = conversationId => {
    console.log("ID is: ", conversationId);

    // sets url for unique conversation id
    const copiedUrl = `http://localhost:3000/chat/${conversationId}`;
    console.log("URL is: ", copiedUrl);

    // copy to clipboard
    // from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp 09-04-24
    navigator.clipboard.writeText(copiedUrl);
    alert("Copied the text: " + copiedUrl);
};

defineExpose({
    getConversations,
    deleteConversation,
});

await getConversations();
</script>

<style scoped></style>
