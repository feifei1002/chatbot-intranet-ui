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
const obj = JSON.stringify(json);
const jsonObj = JSON.parse(obj);

// gets array of questions, with key 'questions'
const questionArray = jsonObj.questions;

// split array into e questions
const questionOne = questionArray[0];
const questionTwo = questionArray[1];
const questionThree = questionArray[2];
</script>

<style></style>
