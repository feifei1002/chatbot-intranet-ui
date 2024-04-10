<script setup>

const config = useRuntimeConfig();
const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});

function sendFeedback(isPositive) {
    console.log(props.content +" is positive? " + isPositive)
}

</script>
<template>
    <UButton icon="i-heroicons-hand-thumb-up" size="sm" color="primary" variant="solid" :trailing="false"
        @click="sendFeedback(true)" />
    <UButton icon="i-heroicons-hand-thumb-down" size="sm" color="primary" variant="solid" :trailing="false"
        @click="sendFeedback(false)" />
</template>