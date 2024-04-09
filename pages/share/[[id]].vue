<template>
    <div v-if="authStatus !== 'unauthenticated'" class="flex size-full">
        <div class="flex w-full bg-pink-500 p-1">
            <!-- prints messages to the page -->
            <div class="flex size-full flex-col overflow-y-scroll">
                <div
                    v-for="(message, index) in chatMessages"
                    :key="index"
                    class="mb-2 max-w-96 text-wrap break-words rounded p-1"
                    :class="{
                        'mr-1 self-end bg-pink-600 text-right': message.role === 'user',
                        'self-start bg-indigo-900 text-left text-white': message.role === 'assistant',
                    }"
                >
                    <MarkdownRenderer :content="message.content" />
                </div>
            </div>
        </div>
    </div>
    <span v-else v-t="'chatbot.unauthorised_share'" class="mt-2 text-center text-xl text-white"></span>
</template>

<script setup>
const config = useRuntimeConfig();
const chatMessages = ref([]);
const route = useRoute();
const conversationId = ref(route.params.id);
const { status: authStatus } = useAuth();

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
</script>
