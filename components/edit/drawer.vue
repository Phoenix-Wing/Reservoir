<template>
    <NDrawer :show="show" @update:show="x => $emit('update:show', x)" :default-width="502" resizable>
        <NDrawerContent :title="title" closable>
            <slot />

            <template #footer>
                <slot name="footer" />
            </template>
        </NDrawerContent>
    </NDrawer>
</template>

<script setup lang="ts">
defineProps<{
    title?: string,
    show?: boolean,
}>();

defineEmits<{
    (event: "update:show", value: boolean): void,
}>();
</script>
