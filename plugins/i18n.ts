import { createI18n } from "vue-i18n";

// guide from https://vue-i18n.intlify.dev/guide/integrations/nuxt3
export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: "en",
        messages: {
            en: {
                hello: "Hello",
            },
        },
    });

    vueApp.use(i18n);
});
