<template>
    <NButton @click="navigateTo(to)">
        <slot />
    </NButton>
</template>

<script setup lang="ts">
defineProps<{
    to?: string,
}>();
</script>
