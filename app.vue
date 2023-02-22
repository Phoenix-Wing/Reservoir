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
})
</script>
