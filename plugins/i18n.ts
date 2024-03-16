import { createI18n } from "vue-i18n";
import en from "../lang/en-GB.json";
import cy from "../lang/cy.json";

// guide from https://vue-i18n.intlify.dev/guide/integrations/nuxt3
export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: "en",
        messages: {
            en,
            cy,
        },
    });

    vueApp.use(i18n);
});
