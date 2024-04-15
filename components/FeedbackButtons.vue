<script setup>
const { token } = useAuth();
const config = useRuntimeConfig();
const textBoxShown = ref(false);
const userInput = defineModel({ name: "userInput", type: String });

// props that come from the chatpage
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

// this makes sure that the preview message when submitting feedback isnt super long
const chatbotMessagePreview =
    props.content.length > 100 ? '"' + props.content.substring(0, 99) + '..."' : '"' + props.content + '"';


// when clicked, pops up the form
function showInputBox() {
    // Confirms user is signed in order to submit feedback
    if (token.value) {
        textBoxShown.value = true;
    } else {
        alert("Please sign in to submit feedback");
    }
}

// when clicked, closes the form
function close() {
    textBoxShown.value = false;
}

async function sendFeedback(isPositive, userInput) {
    // what we are sending to the backend, the ID, whether its positive or not and then the text feedback
    const payload = {
        id: props.id,
        positive: isPositive,
        feedback: userInput,
    };
    // ensures user does not try to submit without entering any text for feedback
    if (userInput === undefined) {
        alert("Please type a brief review for your feedback");
    } else {
        // sends the payload to the backend
        try {
            await fetch(`${config.public.apiURL}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            console.error("Error:", error);
            // Handle the error as needed, such as showing an error message to the user
        }
        close();
    }
}
</script>
<template>
    <div class="flex justify-around">
        <UButton
            icon="i-heroicons-arrows-up-down"
            size="sm"
            color=""
            variant="solid"
            :trailing="false"
            @click="showInputBox"
        />
    </div>

    <UModal v-model="textBoxShown">
        <UCard
            :ui="{
                background: 'bg-slate-100 dark:bg-slate-800',
            }"
        >
            <div class="flex size-full flex-col items-center justify-center text-chatbot-font dark:text-white">
                <div class="my-6 text-xl">{{ $t("feedback.feedbackTitle") }}</div>
                <MarkdownRenderer :content="chatbotMessagePreview" />
                <UTextarea
                    v-model="userInput"
                    aria-required="true"
                    :placeholder="$t('feedback.textareaPlaceholder')"
                    maxlength="250"
                    class="my-6 h-1/4 w-3/4"
                />
                <div class="my-4">
                    <UButton
                        icon="i-heroicons-hand-thumb-up"
                        size="sm"
                        color="green"
                        variant="solid"
                        :label="$t('feedback.positiveLabel')"
                        :trailing="false"
                        @click="sendFeedback(true, userInput)"
                    />
                    <UButton
                        icon="i-heroicons-hand-thumb-down"
                        size="sm"
                        color="red"
                        variant="solid"
                        :label="$t('feedback.negativeLabel')"
                        :trailing="false"
                        @click="sendFeedback(false, userInput)"
                    />
                </div>
                <UButton
                    icon="i-heroicons-x-mark"
                    size="sm"
                    color="gray"
                    variant="solid"
                    :trailing="false"
                    :label="$t('feedback.close')"
                    @click="close()"
                />
            </div>
        </UCard>
    </UModal>
</template>
