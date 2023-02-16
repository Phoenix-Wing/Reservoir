<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
useHead({
    titleTemplate: (pageName) => {
        return pageName
        ? `${pageName} - Reservoir`
        : "Reservoir";
    },
    link: [
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: "",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Inter&family=Roboto+Mono&family=Roboto:wght@400;700&display=swap",
        },
    ],
})
</script>
