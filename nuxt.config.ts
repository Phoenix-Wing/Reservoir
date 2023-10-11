// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    components: [
        { path: "~/components" },
        { path: "~/components/utils", prefix: "U" },
    ],
    eslint: {
        lintOnStart: false,
    },
    modules: [
        "@bg-dev/nuxt-naiveui",
        "@nuxtjs/eslint-module",
    ],
    naiveui: {
        colorModePreference: "dark",
    },
    typescript: {
        shim: false,
    },
});
