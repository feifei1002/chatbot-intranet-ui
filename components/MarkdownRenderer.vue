<template>
    <!-- We are safe from XSS attacks because of DOMPurify -->
    <!-- We need custom css to revert all css styles, since this can't be done in tailwind -->
    <!-- eslint-disable-next-line vue/no-v-html tailwindcss/no-custom-classname -->
    <div class="markdown" v-html="markdownHtml" />
</template>

<script setup>
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});

const markdownHtml = computed(() => {
    // We are using DOMPurify to sanitize the HTML
    return DOMPurify.sanitize(
        // We are using marked to parse the markdown, and convert to HTML
        marked.parse(props.content, {
            mangle: false,
            headerIds: false,
        }),
    );
});
</script>

<style>
.markdown * {
    all: revert;
}
</style>
