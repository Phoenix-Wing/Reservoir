// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@huntersofbook/naive-ui-nuxt",
        "@nuxtjs/color-mode",
    ],
    typescript: {
        shim: false,
    },
    colorMode: {
        preference: "dark",
        fallback: "dark",
    }
});
