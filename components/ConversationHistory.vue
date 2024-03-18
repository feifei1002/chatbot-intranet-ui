<script setup>
const config = useRuntimeConfig();
const titleVal = ref([]);

const props = defineProps({
    chatMessages: {
        type: Array,
        default: () => [],
    },
});

const fetchTitle = async () => {
    // post request to /suggested
    // sends chat messages in post request
    // returns json array (jsonSent) of 3 questions in key 'questions'
    const convoTitle = $fetch(`${config.public.apiURL}/store-conversation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_messages: props.chatMessages,
        }),
    });

    try {
        // gets array of questions from key 'questions'
        titleVal.value = convoTitle.title;
    } catch {
        // cannot get array of suggested questions from key 'questions'
        console.log("error getting json array");
    }
};

defineExpose({
    fetchTitle,
});
</script>

<template>
    <button @click="fetchTitle">Get title based on conversation</button>
    <p v-if="titleVal">{{ titleVal[0] }}</p>
</template>

<style scoped></style>
