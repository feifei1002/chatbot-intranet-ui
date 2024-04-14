<script setup>
const { status, data, signIn } = useAuth();

if (status.value === "authenticated") {
    navigateTo("/");
}

const username = ref("");
const password = ref("");

const showPassword = ref(false);

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
        // Check if the 'admin' property has a truthy value.
        if (data.value.admin) {
            navigateTo("/dashboard");
        } else {
            navigateTo("/");
        }
    } catch (err) {
        console.error(err);
        // alert the message from the error
        // if undefined, alert the error itself
        alert(err?.data?.message ?? err);
    }
};
</script>

<template>
    <div class="flex">
        <div class="flex h-screen w-1/2 items-center justify-center bg-chatbot-black"></div>
        <div class="flex h-screen w-1/2 items-center justify-start bg-chatbot-red pl-20">
            <div class="flex-col pt-6">
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
                        :type="showPassword ? 'text' : 'password'"
                        name="password"
                        required
                        class="mt-1 w-full rounded-md border-2 border-solid border-chatbot-red bg-white text-navbar-blue"
                    />
                </div>
                <div class="my-2 flex">
                    <input
                        id="showPasswordCheckbox"
                        v-model="showPassword"
                        type="checkbox"
                        name="showPasswordCheckbox"
                    />
                    <label
                        v-t="'signin.show'"
                        for="showPasswordCheckbox"
                        class="ml-2 block text-sm text-chatbot-white"
                    />
                </div>
                <button
                    v-t="'signin.signin'"
                    class="w-full rounded-md bg-chatbot-black px-4 py-2 text-chatbot-white"
                    @click="submitInput"
                />
            </div>
        </div>
    </div>
</template>
