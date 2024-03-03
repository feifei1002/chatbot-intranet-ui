<template>
    <!-- suggested questions go here -->
    <!-- if fetch succeeds and array of questions is fetched, outputs suggested qs -->
    <div v-if="questionArr">
        <!-- class used for styling, using tailwind -->
        <!-- indigo used to match the UI of the chatbot's conversation -->
        <p class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white">
            Suggested questions you could ask:
        </p>
        <!-- hovering the button makes the background colour lighter -->
        <button
            type="submit"
            class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"
            @click="handleSubmitOne"
        >
            {{ questionOne }}</button
        ><br />
        <button
            type="submit"
            class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"
            @click="handleSubmitTwo"
        >
            {{ questionTwo }}</button
        ><br />
        <button
            type="submit"
            class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"
            @click="handleSubmitThree"
        >
            {{ questionThree }}
        </button>
    </div>
</template>
<script setup>
// get variables from nuxt.config.ts
const config = useRuntimeConfig();

// fetches JSON array of 3 suggested questions
const { data: questions, error } = await useFetch(`${config.public.apiURL}/suggested`);
const questionArr = separateQuestions(questions);
let questionOne;
let questionTwo;
let questionThree;

function separateQuestions(questions) {
    if (questions.value) {
        // successful request

        // parses value as json
        const obj = JSON.stringify(questions.value);
        const jsonObj = JSON.parse(obj);

        // gets array of questions, with key 'questions'
        return jsonObj.questions;
    } else {
        // failed request

        console.log("error: ", error.value.data.message);
        return null;
    }
}

// split array into 3 questions if array of questions is available
if (questionArr) {
    questionOne = questionArr[0];
    questionTwo = questionArr[1];
    questionThree = questionArr[2];
}

// functions to submit post request of a question from a button
// can probably make this one function but add validation for which question
const handleSubmitOne = async () => {
    if (questionArr) {
        await $fetch(`${config.public.apiURL}/clicked`, {
            method: "post",
            body: {
                question: questionOne,
            },
        });

        console.log("clicked: " + questionOne);
    } else {
        console.log("failed to post question to backend");
    }
};

const handleSubmitTwo = async () => {
    if (questionArr) {
        await $fetch(`${config.public.apiURL}/clicked`, {
            method: "post",
            body: {
                question: questionTwo,
            },
        });

        console.log("clicked: " + questionTwo);
    } else {
        console.log("failed to post question to backend");
    }
};

const handleSubmitThree = async () => {
    if (questionArr) {
        await $fetch(`${config.public.apiURL}/clicked`, {
            method: "post",
            body: {
                question: questionThree,
            },
        });

        console.log("clicked: " + questionThree);
    } else {
        console.log("failed to post question to backend");
    }
};
</script>

<style></style>
