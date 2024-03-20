<template>
    <div class="mx-4">
        <button
            class="text-s flex h-20 cursor-pointer items-center justify-center rounded-md border-2 border-black hover:text-[#353955]"
            :class="isRecording ? 'bg-blue-500' : 'bg-red-500'"
            @click="toggleRecording"
        >
            {{ isRecording ? "Stop Recording" : "Start Recording" }}
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
const emit = defineEmits(["customEvent"]);

async function checkPermissions() {
    const permission = await navigator.permissions.query({ name: "microphone" });
    return permission.state;
}

onMounted(async () => {
    canRecord.value = (await checkPermissions()) !== "denied";
});

function toggleRecording() {
    if (isRecording.value) {
        mediaRecorder?.stop();
        isRecording.value = false;
    } else {
        (async () => {
            if (!canRecord.value) {
                canRecord.value = (await checkPermissions()) !== "denied";
            }

            if (!canRecord.value) return;
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = e => media.push(e.data);

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
                emit("customEvent", transcribedText);
            };

            mediaRecorder.start();
            isRecording.value = true;
        })();
    }
}
</script>
