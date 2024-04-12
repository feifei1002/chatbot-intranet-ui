<script setup>
const { token } = useAuth();
const config = useRuntimeConfig();
const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});

function showInputBox(isPositive) {
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    
    const container = document.createElement("div");
    container.className = "absolute top-0 left-0 w-full h-full flex items-center justify-center"
    container.appendChild(inputBox);
    container.appendChild(submitButton);
    
    document.body.appendChild(container);
    
    submitButton.addEventListener("click", () => {
        const userInput = inputBox.value;
        sendFeedback(isPositive, userInput);
    });
}

async function sendFeedback(isPositive, userInput) {
    // Confirms user is signed in order to submit feedback
    if (token.value) {
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
            });
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed, such as showing an error message to the user
        }
    } else {
        alert("Please sign in to submit feedback");
    }
}

// TO DO for when i pull this onto my pc:
// Merge main into branch
// Make buttons unusable to stop duplicate feedback
// Make text input 250 chars max
// Make it look nice
// Make text box disappear after submission or changing page
// Add a cancel button
// Submit and Cancel buttons should be translated

</script>
<template>
    <div class="flex justify-around">
    <UButton icon="i-heroicons-hand-thumb-up" size="sm" color="blue" variant="solid" :trailing="false"
        @click="showInputBox(true)" />
    <UButton icon="i-heroicons-hand-thumb-down" size="sm" color="red" variant="solid" :trailing="false"
        @click="showInputBox(false)" />
    </div>
</template>