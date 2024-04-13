<script setup>
const { token } = useAuth();
const config = useRuntimeConfig();
const textBoxShown = ref(false);
const userInput = defineModel('userInput')
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

function showInputBox() {
    // Confirms user is signed in order to submit feedback
      if (token.value) {
    textBoxShown.value = true;
       } else {
           alert("Please sign in to submit feedback");
       }
}

function close(){
    textBoxShown.value = false;
}

async function sendFeedback(isPositive, userInput) {
    try {
        await fetch(`${config.public.apiURL}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: props.content,
                positive: isPositive,
                feedback: userInput
            }),
        },
    );
    } catch (error) {
        console.error('Error:', error);
        // Handle the error as needed, such as showing an error message to the user
    }
    close()
}

</script>
<template>
    <div class="flex justify-around">
        <UButton icon="i-heroicons-arrows-up-down" size="sm" color="" variant="solid" :trailing="false"
            @click="showInputBox" />
    </div>

    <div v-show="textBoxShown" class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div class="h-2/4 w-2/6 bg-neutral-300 flex flex-col items-center">
            <div class="text-xl my-6 underline">Feedback Form</div>
            <div> "{{ props.content }}" </div>
            <textarea v-model="userInput" placeholder="Please provide feedback on the message above (250 chars)" maxlength="250"
                class="my-6 h-1/4 w-3/4 text-wrap"></textarea>
            <div class="my-4">
                <UButton icon="i-heroicons-hand-thumb-up" size="sm" color="green" variant="solid"
                    label="Send as Positive Feedback" :trailing="false" @click="sendFeedback(true, userInput)" />
                <UButton icon="i-heroicons-hand-thumb-down" size="sm" color="red" variant="solid"
                    label="Send as Negative Feedback" :trailing="false" @click="sendFeedback(false, userInput)" />
            </div>
            <UButton icon="i-heroicons-x-mark" size="sm" color="" variant="solid" :trailing="false"
                label="Close" @click="close()" />
        </div>
    </div>


</template>