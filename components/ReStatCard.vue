<template>
    <NCard :title="title">
        <NGrid :cols="cols ? cols : 2">
            <slot />
        </NGrid>

        <template #action>
            <NText italic depth="3"><slot name="description" /></NText>
        </template>
    </NCard>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    cols?: number,
}>();
</script>
