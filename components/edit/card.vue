<template>
    <NCard :title="title">
        <NForm :inline="inline">
            <slot />
        </NForm>
    </NCard>
</template>

<script setup lang="ts">
defineProps<{
    title?: string,
    inline?: boolean,
}>();
</script>
