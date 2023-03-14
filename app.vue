<template>
    <NConfigProvider :theme="darkTheme">
        <NGlobalStyle />
        <NMessageProvider>
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </NMessageProvider>
    </NConfigProvider>
</template>

<script setup lang="ts">
import { darkTheme } from "naive-ui";

useHead({
    titleTemplate: (pageName) => {
        return pageName
        ? `${pageName} - Reservoir`
        : "Reservoir";
    },
})
</script>
