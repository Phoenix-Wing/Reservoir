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
        "@huntersofbook/naive-ui-nuxt",
        "@nuxtjs/eslint-module",
    ],
    typescript: {
        shim: false,
    },
});
