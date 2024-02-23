// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@nuxtjs/i18n", "@nuxtjs/eslint-module"],
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
