<template>
    <div>
      <!-- Navigation Bar -->
      <div class="navbar">
        <div class="logo">ChatBot</div>
        <!-- Assuming you have a logo, adjust accordingly -->
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
        <div class="message-box flex items-center">
          <textarea v-model="userMessage" placeholder="Message the ChatBot..." class="flex-1 mr-2" style="color: rgb(6, 5, 5)"></textarea>
        </div>
        <div class="send-button">
            <button @click="sendMessage" class="send-btn">Send</button>
          </div>
  
        <!-- Display user messages on the right edge -->
        <div v-if="userMessages.length" class="user-messages">
          <div v-for="(message, index) in userMessages" :key="index" class="user-message right-edge">{{ message }}</div>
        </div>
         <!-- New Chat Button -->
      <button @click="newChat" class="new-chat-btn">New Chat</button>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userMessage: '',
        userMessages: [],
      };
    },
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
      sendMessage() {
        if (this.userMessage.trim() !== '') {
          this.userMessages.push(this.userMessage.trim());
          this.userMessage = ''; // Clear the input after sending
        }
      },
      newChat() {
        // Clear user messages
        this.userMessages =[];
      }
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
      margin-left: 80px;
      max-width: 850px;
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
  
    .send-button {
      position: absolute;
      bottom: 45px;
      right: 20px; /* Adjust the right spacing as needed */
    }
  
    .send-btn {
      background-color: transparent; /* Adjust the color as needed */
      color: black;
      padding: 10px;
      border: 2px solid black; /* Add a small border around the button */
      border-radius: 5px;
      cursor: pointer;
    }
  
    .send-btn:hover {
      background-color: white; /* Change to white on hover */
      color: #353955; 
    }
  
    .user-messages {
      position: absolute;
      top: 40px;
      right: 20px;
      max-width: 300px; /* Adjust the max-width as needed */
    }
  
    .user-message {
      background-color: #353955;
      color: white;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 5px;
    }
  
    .right-edge {
      align-self: flex-end;
    }

    .new-chat-btn {
    position: absolute;
    top: 15px;
    left: 20px;
    margin-left: 120px;
    background-color: transparent;
    color: white;
    padding: 8px;
    border: 2px solid white;
    border-radius: 5px;
    cursor: pointer;
  }

  .new-chat-btn:hover {
      background-color: white; /* Change to white on hover */
      color: #353955; 
    }
  </style>
  