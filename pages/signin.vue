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
    await signIn(credentials, {
        redirect: false,
    })
        .catch(err => {
            console.error(err);
            // alert the message from the error
            // if undefined, alert the error itself
            alert(err?.data?.message ?? err);
        })
        .then(() => {
            navigateTo("/");
        });
};
</script>

<template>
    <div class="flex">
        <div class="flex h-screen w-1/2 items-center justify-center bg-chatbot-pink"></div>
        <div class="flex h-screen w-1/2 items-center justify-start bg-white pl-20">
            <div class="flex-col pt-6">
                <p v-t="'signin.welcome'" class="py-6 text-6xl font-bold text-navbar-blue underline" />

                <div class="mb-4">
                    <input
                        id="username"
                        v-model="username"
                        :placeholder="$t('signin.username')"
                        type="text"
                        name="username"
                        required
                        class="mt-1 w-full rounded-md border-2 border-solid border-chatbot-pink bg-white text-navbar-blue"
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
                        class="mt-1 w-full rounded-md border-2 border-solid border-chatbot-pink bg-white text-navbar-blue"
                    />
                </div>
                <div class="my-2 flex">
                    <input id="remember_me" type="checkbox" name="remember_me" />
                    <label v-t="'signin.remember'" for="remember_me" class="ml-2 block text-sm text-navbar-blue" />
                </div>
                <button
                    v-t="'signin.signin'"
                    class="w-full rounded-md bg-navbar-blue px-4 py-2 text-white"
                    @click="submitInput"
                />
            </div>
        </div>
    </div>
</template>
