<template>
    <div v-if="titleVal">
        <button
            class="mt-4 cursor-pointer rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
        >
            {{ titleVal[0] }}
        </button>
    </div>
</template>

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
    // post request to get a title based on the conversation
    const convoTitle = await $fetch(`${config.public.apiURL}/store-conversation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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

defineExpose({
    fetchTitle,
});
</script>

<style scoped></style>
