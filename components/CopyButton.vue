<template>
    <UButton
        icon="i-heroicons-clipboard-document"
        size="sm"
        color="primary"
        variant="solid"
        label="Copy"
        :trailing="false"
        @click="copyText"
    />
</template>

<script setup>
const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});

const copyText = () => {
    navigator.clipboard
        .writeText(props.content)
        .catch(err => {
            console.error("Unable to copy text: ", err);
        })
        .then(() => {
            console.log("Text copied:", props.content);
        });
};
</script>
