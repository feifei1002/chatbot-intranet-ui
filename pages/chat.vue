<template>
    <div></div>
</template>

<script setup>
// get variables from nuxt.config.ts
const config = useRuntimeConfig();

// fetches a JSON array of 3 suggested questions
const { data: questions } = await useFetch(`${config.public.apiURL}/suggested`);
console.log("JSON array of suggested questions is:");
console.log(questions);
</script>

<style></style>
