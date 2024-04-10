<script setup>
const { token } = useAuth();
const config = useRuntimeConfig();
const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});

function sendFeedback(isPositive) {
    // Confirms user is signed in order to submit feedback
    if (token.value) {
        console.log(props.content + " is positive? " + isPositive)
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