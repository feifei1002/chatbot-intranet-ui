<template>
    <div>
        <!--   used for testing json data fetched, delete soon   -->
        <p>{{ threeQsJSON }}</p>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
// fetches a JSON array of 3 suggested questions
// from /suggested in utils/suggested_questions.py
const threeQsJSON = await useFetch(`${config.public.apiURL}/suggested`);
</script>

<style></style>
