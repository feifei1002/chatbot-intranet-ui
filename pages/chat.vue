<template>
    <div>
        <!-- Navigation Bar -->
        <div class="navbar">
            <div class="logo">ChatBot</div> <!-- Assuming you have a logo, adjust accordingly -->
            <div class="menu-items">
                <div class="nav-item home" @click="goToHome">Home</div>
                <div class="nav-item" @click="signIn">Sign In</div>
                <div class="nav-item try-chatbot" @click="tryChatbot">Try Chatbot</div>
            </div>
        </div>

        <!-- Chat Container -->
        <div class="chat-container">
            <!-- Your chatbot content goes here -->

            <div class="background-section dark-blue"></div>
            <div class="background-section dark-pink"></div>

            <!-- Circular Rectangle Box at the bottom -->
            <div class="message-box">
                <textarea placeholder="Message the ChatBot..." style="color: rgb(6, 5, 5);"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToHome() {
            // Implement logic to navigate to the Home page
        },
        signIn() {
            // Implement logic for signing in
        },
        tryChatbot() {
            // Implement logic for trying the chatbot
        },
    },
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #353955;
    height: 60px;
    padding: 0 20px;
}

.logo {
    color: white;
    font-weight: bold;
}

.menu-items {
    display: flex;
}

.nav-item {
    cursor: pointer;
    margin-left: 15px;
    color: white;
}

.nav-item.home {
    font-weight: bold;
    margin-right: 10px;
}

.nav-item.try-chatbot {
    color: #dc4e79;
}

.chat-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.background-section {
    position: absolute;
    width: 100%;
    height: 100%;
}

.dark-blue {
    background-color: #211639;
    left: 0;
    width: 20%;
}

.dark-pink {
    background-color: #dc4e79;
    right: 0;
    width: 80%;
}

.message-box {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    margin-left: 120px;
    max-width: 950px;
    background-color: transparent;
    padding: 10px;
    border-radius: 20px;
    border: 2px solid black;
}

.message-box textarea {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 5px;
    border: none;
    outline: none;
    font-size: 16px;
    color: black;
    background-color: transparent;
    resize: none;
}

.message-box textarea::placeholder {
    color: black;

}
</style>
