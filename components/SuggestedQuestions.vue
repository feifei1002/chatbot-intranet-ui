<template>
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
            @click="handleSubmitQuestionClicked(questionOne)"
        >
            {{ questionOne }}</button
        ><br />
        <button
            type="submit"
            class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"
            @click="handleSubmitQuestionClicked(questionTwo)"
        >
            {{ questionTwo }}</button
        ><br />
        <button
            type="submit"
            class="mb-2 max-w-96 text-wrap break-words rounded bg-indigo-900 p-1 text-white hover:bg-indigo-500"
            @click="handleSubmitQuestionClicked(questionThree)"
        >
            {{ questionThree }}
        </button>
    </div>
</template>
<script setup>
const questionOne = ref("");
const questionTwo = ref("");
const questionThree = ref("");
const questionArr = ref("");

// below code is probably badly written, need to reformat
const returnSeparateQuestions = async () => {
    const { data: jsonSent, error } = await useFetch(`${config.public.apiURL}/suggested`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_messages: chatMessages.value,
        }),
    });

    if (jsonSent.value) {
        // successful request

        // parses value as json
        const obj = JSON.stringify(jsonSent.value);
        const jsonObj = JSON.parse(obj);

        // gets array of questions, with key 'questions'
        questionArr.value = jsonObj.questions;
        questionOne.value = questionArr.value[0];
        questionTwo.value = questionArr.value[1];
        questionThree.value = questionArr.value[2];
    } else {
        // failed request

        console.log("error: ", error.data.message);
    }
};

// gets question clicked
const handleSubmitQuestionClicked = questionClicked => {
    if (questionArr.value) {
        console.log("clicked: ", questionClicked);

        // now send questions to chatbot
        userMessage.value = questionClicked;
        sendMessage();
    } else {
        console.log("Error when clicking a question");
    }
};
</script>
