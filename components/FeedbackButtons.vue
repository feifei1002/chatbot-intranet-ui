<script setup>
const { token } = useAuth();
const config = useRuntimeConfig();
const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});

async function sendFeedback(isPositive) {
    // Confirms user is signed in order to submit feedback
    if (token.value) {
        try {
            await fetch(`${config.public.apiURL}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: props.content,
                    positive: isPositive
                }),
            });
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed, such as showing an error message to the user
        }
    } else {
        alert("Please sign in to submit feedback");
    }
}


</script>
<template>
    <UButton icon="i-heroicons-hand-thumb-up" size="sm" color="primary" variant="solid" :trailing="false"
        @click="sendFeedback(true)" />
    <UButton icon="i-heroicons-hand-thumb-down" size="sm" color="primary" variant="solid" :trailing="false"
        @click="sendFeedback(false)" />
</template>