import { createI18n } from "vue-i18n";
import en from "../lang/en-GB.json";
import cy from "../lang/cy.json";
import ko from "../lang/ko.json";

// guide from https://vue-i18n.intlify.dev/guide/integrations/nuxt3
export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: "en",
        messages: {
            en,
            cy,
            ko,
        },
    });

    vueApp.use(i18n);
});
