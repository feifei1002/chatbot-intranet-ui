<template>
    <div class="flex">
        <div class="flex h-screen w-1/2 items-center justify-center bg-chatbot-pink">
        </div>
        <div class="flex h-screen w-1/2 items-center justify-start bg-white pl-20">
            <div class="flex-col pt-6">
                <p class="text-navbar-blue font-bold text-6xl underline pt-6 pb-6"> WELCOME! </p>
                <form>
                    <div class="mb-4">
                        <input type="text" id="username" name="username" placeholder="USERNAME" required
                            class="mt-1 w-full rounded-md bg-white text-navbar-blue border-solid border-2 border-chatbot-pink">
                    </div>
                    <div>
                        <input type="password" id="password" name="password" placeholder="PASSWORD" required
                            class="mt-1 w-full rounded-md bg-white text-navbar-blue border-solid border-2 border-chatbot-pink">
                    </div>
                    <div class="flex my-2">
                    <input type="checkbox" id="remember_me" name="remember_me">
                    <label for="remember_me" class="ml-2 block text-sm text-navbar-blue">Remember me</label>
                </div>
                    <button class="w-full bg-navbar-blue text-white py-2 px-4 rounded-md">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</template>
