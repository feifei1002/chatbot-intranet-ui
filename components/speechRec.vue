<template>
    <div class="mx-4">
        <button
            class="text-s flex h-20 cursor-pointer items-center justify-center rounded-md border-2 border-black hover:text-[#353955]"
            :class="{
                'bg-blue-500': isRecording && canRecord,
                'bg-red-500': !isRecording && canRecord,
                'bg-gray-500': !canRecord,
            }"
            @click="toggleRecording"
        >
            <!-- Display message based on recording state and permission -->
            <div v-if="!canRecord" vt-speechRec="micDisabled"></div>
            <div v-else>
                {{ isRecording ? $t("speechRec.stopRecording") : $t("speechRec.startRecording") }}
            </div>
        </button>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const config = useRuntimeConfig();
let media = [];
let mediaRecorder = null;
const isRecording = ref(false);
const canRecord = ref(false);
const emit = defineEmits(["transcriptionEvent"]);

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
                    emit("transcriptionEvent", transcribedText);
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
