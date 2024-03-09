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
    const textarea = document.createElement("textarea");
    textarea.value = props.content;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    // Optionally, you can emit an event or perform any other action
    console.log("Text copied:", props.content);
};
</script>
