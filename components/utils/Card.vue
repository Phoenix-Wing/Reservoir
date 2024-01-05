<template>
    <NCard class="u-card">
        <template v-if="$slots['header-extra']" #header-extra>
            <slot name="header-extra" />
        </template>

        <slot />

        <template v-if="$slots.action" #action>
            <slot name="action" />
        </template>
    </NCard>
</template>

<script setup lang="ts">
const theme = useThemeVars();

const props = withDefaults(
    defineProps<{ kind: "default" | "error" }>(),
    { kind: "default" },
);

const borderColor = computed(() => ({
    default: "var(--n-border-color)",
    error: theme.value.errorColorSuppl,
})[props.kind]);
</script>

<style scoped>
.u-card {
    border-color: v-bind(borderColor);
}
</style>
