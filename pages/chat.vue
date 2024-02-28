<template>
    <div>
        <h1>Three suggested questions:</h1>
        <!--   variables taken from backend request   -->
        <p>{{ questionOne }}</p>
        <p>{{ questionTwo }}</p>
        <p>{{ questionThree }}</p>
    </div>
</template>
<script setup>
// get variables from nuxt.config.ts
const config = useRuntimeConfig();

// fetches JSON array of 3 suggested questions
const { data: questions } = await useFetch(`${config.public.apiURL}/suggested`);

// gets value as json
const json = questions.value;
// parses value as json
const obj = JSON.parse(json);

// defines each question to a separate variable
const questionOne = obj.question1;
const questionTwo = obj.question2;
const questionThree = obj.question3;
</script>

<style></style>
