<script setup>
const { status, data, signIn } = useAuth();

if (status.value === "authenticated") {
    navigateTo("/");
}

const username = ref("");
const password = ref("");

const showPassword = ref(false);

const submitting = ref(false);

const submitInput = async () => {
    const credentials = {
        username: username.value,
        password: password.value,
    };

    // This sends a POST request to the `auth.provider.endpoints.signIn` (/api/token) endpoint with `credentials` as the body
    try {
        submitting.value = true;
        await signIn(credentials, {
            redirect: false,
        });
        submitting.value = false;
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
        submitting.value = false;
    }
};
</script>

<template>
    <div class="flex h-screen flex-col md:flex-row">
        <!-- Black section -->
        <div
            class="flex h-1/3 w-screen items-center justify-center bg-chatbot-black md:h-screen md:w-1/2 dark:bg-chatbot-font"
        ></div>
        <!-- Red section -->
        <div
            class="flex h-2/3 w-screen items-center justify-center bg-chatbot-red md:h-screen md:w-1/2 dark:bg-chatbot-dark-red"
        >
            <div class="pt-6 md:w-96">
                <p
                    v-t="'signin.welcome'"
                    class="dark: py-6 text-6xl font-bold text-chatbot-black underline dark:text-chatbot-white"
                />

                <div class="mb-4">
                    <input
                        id="username"
                        v-model="username"
                        :placeholder="$t('signin.username')"
                        type="text"
                        name="username"
                        required
                        class="mt-1 w-full rounded-md border-2 border-solid border-chatbot-red bg-white text-navbar-blue dark:border-chatbot-dark-red"
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
                        class="mt-1 w-full rounded-md border-2 border-solid border-chatbot-red bg-white text-navbar-blue dark:border-chatbot-dark-red"
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
                <UButton
                    :label="$t('signin.signin')"
                    class="w-full"
                    color="black"
                    :loading="submitting"
                    :disabled="submitting"
                    @click="submitInput"
                ></UButton>
            </div>
        </div>
    </div>
</template>
