<template>
    <NDrawer :show="show" :default-width="isMobile ? 350 : 502" resizable @update:show="x => $emit('update:show', x)">
        <NDrawerContent :title="title" closable>
            <slot />

            <template #footer>
                <slot name="footer" />
            </template>
        </NDrawerContent>
    </NDrawer>
</template>

<script setup lang="ts">
const { isMobile } = useNaiveDevice();

defineProps<{
    title?: string,
    show?: boolean,
}>();

defineEmits<{
    "update:show": [value: boolean],
}>();
</script>
