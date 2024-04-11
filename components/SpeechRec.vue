<template>
    <UButton
        class="flex items-center justify-center rounded-md p-2 text-white"
        :class="{
            'bg-blue-500 hover:bg-blue-600': isRecording && canRecord,
            'bg-amaranth-500 hover:bg-amaranth-600': !isRecording && canRecord,
            'bg-gray-500 hover:bg-gray-600': !canRecord,
        }"
        :label="buttonLabel"
        :icon="buttonIcon"
        @click="toggleRecording"
    />
</template>

<script setup>
const config = useRuntimeConfig();
let media = [];
let mediaRecorder = null;
const isRecording = ref(false);
const canRecord = ref(false);
const emit = defineEmits(["onTranscribed"]);

const { t } = useI18n({ useScope: "global" });

const buttonLabel = computed(() => {
    if (!canRecord.value) return t("speechRec.micDisabled");
    return isRecording.value ? t("speechRec.stopRecording") : t("speechRec.startRecording");
});

const buttonIcon = computed(() => {
    if (!canRecord.value) return "i-mdi-microphone-minus";
    return isRecording.value ? "i-mdi-record-circle" : "i-mdi-microphone";
});

// Function to check microphone permissions
async function checkPermissions() {
    try {
        const permission = await navigator.permissions.query({ name: "microphone" });
        return permission.state;
    } catch (e) {
        console.error("Error checking microphone permission:", e);
    }
}

// Lifecycle hook: Runs after component is mounted
onMounted(async () => {
    canRecord.value = (await checkPermissions()) !== "denied";
});

function toggleRecording() {
    if (isRecording.value) {
        // If already recording, stop recording
        mediaRecorder?.stop();
        isRecording.value = false;
    } else {
        // If not recording, start recording
        (async () => {
            if (!canRecord.value) {
                canRecord.value = (await checkPermissions()) !== "denied";
            }
            // If permissions denied, do nothing
            if (!canRecord.value) return;
            try {
                // Initialize media recorder with the stream
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = e => media.push(e.data);

                // Event listener for when recording is stopped
                mediaRecorder.onstop = async function () {
                    const audioBlob = new Blob(media, { type: "audio/ogg; codecs=opus" });
                    media = [];

                    // Upload the audioBlob to a server
                    const response = await fetch(`${config.public.apiURL}/transcribe`, {
                        method: "POST",
                        body: audioBlob,
                    });

                    const transcribedText = (await response.json()).text;
                    console.log("text:" + transcribedText);
                    // Emit a custom event with the transcribed text
                    emit("onTranscribed", transcribedText);
                };
                // Start recording
                mediaRecorder.start();
                isRecording.value = true;
            } catch (e) {
                console.log("Error during transcription:", e);
            }
        })();
    }
}
</script>
