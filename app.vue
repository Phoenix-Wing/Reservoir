<template>
    <NaiveConfig>
        <NLoadingBarProvider>
            <NaiveLoadingBar navigation />

            <NMessageProvider>
                <NuxtLayout>
                    <NuxtPage />
                </NuxtLayout>
            </NMessageProvider>
        </NLoadingBarProvider>
    </NaiveConfig>
</template>

<script setup lang="ts">
useHead({
    titleTemplate: (pageName) => {
        return pageName
            ? `${pageName} - Reservoir`
            : "Reservoir";
    },
});
</script>
