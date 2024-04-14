<script setup>
const { token } = useAuth();
const config = useRuntimeConfig();
const textBoxShown = ref(false);
const submitted = ref(false);
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
    // if (token.value) {
    textBoxShown.value = true;
    //   } else {
    //       alert("Please sign in to submit feedback");
    //  }
}

function close() {
    textBoxShown.value = false;
}

async function sendFeedback(isPositive, userInput) {
    const payload = {
        message: props.content,
        positive: isPositive,
        feedback: userInput
    }
    try {
        await fetch(`${config.public.apiURL}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        },
        );
    } catch (error) {
        console.error('Error:', error);
        // Handle the error as needed, such as showing an error message to the user
    }
    close()
    submitted.value = true;
}

</script>
<template>
    <div class="flex justify-around">
        <UButton icon="i-heroicons-arrows-up-down" :disabled="submitted" size="sm" color="" variant="solid" :trailing="false"
            @click="showInputBox" />
    </div>

    <UModal v-model="textBoxShown">
        <UCard background="bg-white dark:bg-gray-900">
            <div class="w-full h-full flex flex-col items-center justify-center">
                    <div class="text-xl my-6">Feedback Form</div>
                <div class="text-wrap"> "{{ props.content }}" </div>
                <UTextarea v-model="userInput" placeholder="Please provide feedback on the message above (250 chars)"
                    maxlength="250" class="my-6 h-1/4 w-3/4" />
                <div class="my-4">
                    <UButton icon="i-heroicons-hand-thumb-up" size="sm" color="green" variant="solid"
                        label="Send as Positive Feedback" :trailing="false" @click="sendFeedback(true, userInput)" />
                    <UButton icon="i-heroicons-hand-thumb-down" size="sm" color="red" variant="solid"
                        label="Send as Negative Feedback" :trailing="false" @click="sendFeedback(false, userInput)" />
                </div>
                <UButton icon="i-heroicons-x-mark" size="sm" color="gray" variant="solid" :trailing="false" label="Close"
                    @click="close()" />
            </div>
        </UCard>
    </UModal>
</template>