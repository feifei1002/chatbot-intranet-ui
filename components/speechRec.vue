<script setup>

const config = useRuntimeConfig();
let media = [];
let mediaRecorder = null;
let isRecording = false;
let canRecord = false;

async function checkPermissions() {
    const permission = await navigator.permissions.query({ name: 'microphone' });
    return permission.state;
}

onMount(async () => {
    canRecord = (await checkPermissions()) !== 'denied';
});

function toggleRecording() {
    if (isRecording) {
        mediaRecorder?.stop();
        isRecording = false;
    } else {
        (async () => {
            if (!canRecord) {
                canRecord = (await checkPermissions()) !== 'denied';
            }

            if (!canRecord) return;
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => media.push(e.data);

            mediaRecorder.onstop = async function () {
                const audioBlob = new Blob(media, { type: 'audio/ogg; codecs=opus' });
                media = [];

                // Upload the audioBlob to a server
                const response = await fetch(`${config.public.apiURL}/transcribe`, {
                    method: 'POST',
                    body: audioBlob
                });

                const transcribedText = (await response.json()).text;

                // Emit a custom event with the transcribed text
                this.$emit('transcribed', transcribedText);
            };

            mediaRecorder.start();
            isRecording = true;
        })();
    }
}
</script>

<template>
    <div class="absolute right-10 rounded-full">
        <button @click={
             toggleRecording } @disabled={ !canRecord } class="text-xl" :class="{
            'text-blue-500': isRecording,
            'text-red-500': !isRecording
        }"></button>
    </div>
</template>