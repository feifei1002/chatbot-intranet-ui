<template>
    <div>
        <h1>Three suggested questions:</h1>
        <br />
        <!--   variables taken from backend request   -->
        <button type="submit" @click="handleSubmitOne">{{ questionOne }}</button><br /><br />
        <button type="submit" @click="handleSubmitTwo">{{ questionTwo }}</button><br /><br />
        <button type="submit" @click="handleSubmitThree">{{ questionThree }}</button>
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

// functions to submit post request of a question from a button
// can probably make this one function but add validation for which question
const handleSubmitOne = async () => {
    await $fetch(`${config.public.apiURL}/clicked`, {
        method: "post",
        body: {
            question: questionOne,
        },
    });

    console.log("clicked: " + questionOne);
};

const handleSubmitTwo = async () => {
    await $fetch(`${config.public.apiURL}/clicked`, {
        method: "post",
        body: {
            question: questionTwo,
        },
    });

    console.log("clicked: " + questionTwo);
};

const handleSubmitThree = async () => {
    await $fetch(`${config.public.apiURL}/clicked`, {
        method: "post",
        body: {
            question: questionThree,
        },
    });

    console.log("clicked: " + questionThree);
};
</script>

<style></style>
