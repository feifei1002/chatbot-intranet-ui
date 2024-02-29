<template>
    <div class="flex h-full">
        <!-- Blue side with 1/3 of the page -->
        <div class="flex w-1/5 flex-col bg-indigo-950 p-4">
            <!-- New Chat Button -->
            <button
                class="mt-4 cursor-pointer rounded-full border-2 border-white bg-transparent px-4 py-2 text-white transition duration-300 hover:bg-white hover:text-black"
                @click="newChat"
            >
                New Chat
            </button>
        </div>
        <!-- Pink side with 3/4 of the page -->
        <div class="flex w-4/5 flex-col bg-pink-500 p-1">
            <!-- Add your chatbot content here -->
            <div class="flex h-full flex-col overflow-y-scroll">
                <div
                    v-for="(message, index) in userMessages"
                    :key="index"
                    class="mb-2 max-w-96 text-wrap break-words rounded p-1"
                    :class="{
                        'mr-1 self-end bg-pink-600 text-right': message.sender === 'user',
                        'self-start bg-indigo-900 text-left text-white': message.sender === 'bot',
                    }"
                >
                    {{ message.text }}
                </div>
            </div>

            <div class="flex justify-end">
                <!-- Circular Rectangle Box at the bottom -->
                <textarea
                    v-model="userMessage"
                    placeholder="Message the ChatBot..."
                    class="box-border h-20 w-full resize-none rounded-2xl border-2 border-black bg-transparent p-5 outline-none"
                    style="color: rgb(6, 5, 5)"
                ></textarea>

                <button
                    class="h-20 cursor-pointer rounded-md border-2 border-black px-2 py-7 hover:bg-white hover:text-[#353955]"
                    @click="sendMessage"
                >
                    Send
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userMessage: "",
            userMessages: [],
        };
    },
    methods: {
        sendMessage() {
            if (this.userMessage.trim() !== "") {
                const userMessage = this.userMessage.trim();

                // Push the user's message first
                this.userMessages.push({ text: userMessage, sender: "user" });

                // Simulate a delayed response from the ChatBot
                setTimeout(() => {
                    const botReply = "Hello, I am the ChatBot. How can I assist you today?";

                    // Push the bot's reply after the user's message
                    this.userMessages.push({ text: botReply, sender: "bot" });

                    // Scroll to the bottom after a delay (adjust the delay if needed)
                    setTimeout(() => {
                        const messageContainer = this.$refs.messageContainer;
                        messageContainer.scrollTop = messageContainer.scrollHeight;
                    }, 100);
                }, 500);

                this.userMessage = ""; // Clear the input after sending
            }
        },

        newChat() {
            // Clear user messages
            this.userMessages = [];
        },
    },
};
</script>
