<template>
    <div v-if="titleVal.length > 0">
        <button
            class="mt-4 cursor-pointer rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
            @click="fetchHistory(titleVal[0])"
        >
            {{ titleVal[0] }}
        </button>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const titleVal = ref([]);
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

const fetchMessage = async () => {
    try {
        // Post request to get message based on the conversation
        await $fetch(`${config.public.apiURL}/store_conversation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token.value && { Authorization: token.value }),
            },
            body: JSON.stringify({
                chat_messages: props.chatMessages,
            }),
        });
    } catch (error) {
        // Handle errors here
        console.error("Error fetching conversation message:", error);
    }
};

// fetch conversation history based on title and authenticated user
const fetchHistory = async title => {
    // sends title and token
    try {
        console.log(title);
        // Post request to get message based on the conversation
        const history = await $fetch(`${config.public.apiURL}/get_conversation_from_title`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token.value && { Authorization: token.value }),
            },
            body: {
                conversation_title: title,
            },
        });

        console.log(history);
    } catch (error) {
        // Handle errors here
        console.error("Error fetching conversation message:", error);
    }
    // returns conversation history to be outputted
    // call function from chat.vue that sets chat history to page
};

defineExpose({
    fetchTitle,
    fetchMessage,
});
</script>

<style scoped></style>
