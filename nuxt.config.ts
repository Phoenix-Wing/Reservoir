// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    components: [
        { path: "~/components" },
        { path: "~/components/utils", prefix: "U" },
    ],
    modules: [
        "@huntersofbook/naive-ui-nuxt",
    ],
    typescript: {
        shim: false,
    },
});
