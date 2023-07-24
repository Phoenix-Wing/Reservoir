<template>
    <NBreadcrumb>
        <!-- href combines the `hrefPart`s of current and previous routes -->
        <NBreadcrumbItem v-for="partIdx in routes.length" :key="partIdx" :href="routes.slice(0, partIdx).map(x => x[1]).join('')">
            {{ routes[partIdx - 1][0] }}
        </NBreadcrumbItem>
    </NBreadcrumb>
</template>

<script setup lang="ts">
// Route is a list of [displayName: string, hrefPart: string]
defineProps<{routes: [string, string][]}>();
</script>
