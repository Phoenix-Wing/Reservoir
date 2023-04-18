<template>
    <NFormItem :label="label">
        <NInputNumber @update:value="emitUpdate" :placeholder="defaultAsString" :precision="precision ? precision : 0">
            <template #suffix v-if="suffix">{{ suffix }}</template>
        </NInputNumber>
    </NFormItem>
</template>

<script setup lang="ts">
const props = defineProps<{
    default: number,
    label?: string,
    suffix?: string,
    precision?: number,
}>();

const emit = defineEmits<{
    (event: "update", val: number | null): void,
}>();

const defaultAsString = computed(() => props.default.toString());

function emitUpdate(val: number | null) {
    // Emit null if value is the same as default
    if (val != props.default) {
        emit("update", val);
    } else {
        emit("update", null);
    }
}
</script>
