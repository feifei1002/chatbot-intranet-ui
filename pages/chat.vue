<template>
    <div>
        <!--   used for testing json data fetched, delete soon   -->
        <span v-if="questions">JSON questions: {{ questions }}</span>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
// fetches a JSON array of 3 suggested questions
// from suggested_questions.py
const { data: questions } = await useFetch(`${config.public.apiURL}/suggested`);
</script>

<style></style>
