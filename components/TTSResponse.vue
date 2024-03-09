<template>
    <div>
        <UButton
            v-if="content !== ''"
            icon="i-heroicons-speaker-wave-16-solid"
            size="2xs"
            color="gray"
            square
            variant="ghost"
            title="Click to hear response"
            @click="speakMessage"
        />
    </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});

const speakMessage = async () => {
    try {
        const config = useRuntimeConfig();
        // Make a POST request to the TTS endpoint
        const ttsResponse = await fetch(`${config.public.apiURL}/tts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: props.content,
            }),
        });

        // Check if the TTS request was successful
        if (!ttsResponse.ok) {
            console.error("Failed to fetch TTS response");
            return;
        }

        // Convert the TTS response to an audio blob
        const audioBuffer = await ttsResponse.arrayBuffer();
        const audioBlob = new Blob([audioBuffer], { type: "audio/ogg" });

        // Create an Audio element and set its source
        const audio = new Audio();
        audio.src = URL.createObjectURL(audioBlob);

        // Play the audio
        await audio.play();
    } catch (error) {
        // Handle any errors that occur during the TTS request or audio playback
        console.error("Error during TTS request:", error);
    }
};
</script>
