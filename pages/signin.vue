<script setup>
const { status, signIn } = useAuth();

if (status.value === "authenticated") {
    navigateTo("/");
}

const username = ref("");
const password = ref("");

const submitInput = async () => {
    const credentials = {
        username: username.value,
        password: password.value,
    };

    // This sends a POST request to the `auth.provider.endpoints.signIn` (/api/token) endpoint with `credentials` as the body
    try {
        await signIn(credentials, {
            redirect: false,
        });
        navigateTo("/");
    } catch (err) {
        console.error(err);
        // alert the message from the error
        // if undefined, alert the error itself
        alert(err?.data?.message ?? err);
    }
};
</script>

<template>
    <div class="flex h-screen flex-col md:flex-row">
        <!-- Black section -->
        <div class="flex h-1/3 w-screen items-center justify-center bg-chatbot-black md:h-screen md:w-1/2"></div>
        <!-- Red section -->
        <div class="flex h-2/3 w-screen items-center justify-center bg-chatbot-red md:h-screen md:w-1/2">
            <div class="pt-6 md:w-96">
                <p v-t="'signin.welcome'" class="py-6 text-6xl font-bold text-chatbot-black underline" />

                <div class="mb-4">
                    <input
                        id="username"
                        v-model="username"
                        :placeholder="$t('signin.username')"
                        type="text"
                        name="username"
                        required
                        class="mt-1 w-full rounded-md border-2 border-solid border-chatbot-red bg-white text-navbar-blue"
                    />
                </div>
                <div>
                    <input
                        id="password"
                        v-model="password"
                        :placeholder="$t('signin.password')"
                        type="password"
                        name="password"
                        required
                        class="mt-1 w-full rounded-md border-2 border-solid border-chatbot-red bg-white text-navbar-blue"
                    />
                </div>
                <div class="my-2 flex">
                    <input id="remember_me" type="checkbox" name="remember_me" />
                    <label v-t="'signin.remember'" for="remember_me" class="ml-2 block text-sm text-chatbot-white" />
                </div>
                <button
                    v-t="'signin.signin'"
                    class="w-full rounded-md bg-chatbot-black px-4 py-2 text-chatbot-white"
                    @click="submitInput"
                ></button>
            </div>
        </div>
    </div>
</template>
