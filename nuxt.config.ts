// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxt/ui",
        "@nuxtjs/i18n",
        "@nuxtjs/eslint-module",
        "@nuxtjs/tailwindcss",
        "nuxt-icon",
        "@sidebase/nuxt-auth",
    ],
    auth: {
        baseURL: "/api/auth",
        provider: {
            type: "local",
            endpoints: {
                signIn: { path: "/token", method: "post" },
                getSession: { path: "/session", method: "get" },
            },
            token: { signInResponseTokenPointer: "/access_token" },
        },
    },
    runtimeConfig: {
        public: {
            apiURL: "http://127.0.0.1:8000",
        },
    },
    i18n: {
        defaultLocale: "en",
        langDir: "lang",
        locales: [
            {
                code: "en",
                file: "en-GB.json",
            },
        ],
    },
});
