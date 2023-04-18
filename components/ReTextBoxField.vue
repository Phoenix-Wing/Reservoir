<template>
    <NFormItem>
        <NInput type="textarea" @update:value="emitUpdate" :defaultValue="default" :maxlength="maxlength"
            :autosize="{ minRows: 3, maxRows: 10 }" showCount clearable />
    </NFormItem>
</template>

<script setup lang="ts">
const props = defineProps<{
    default: string,
    label?: string,
    maxlength?: number,
}>();

const emit = defineEmits<{
    (event: "update", val: string | null): void,
}>();

function emitUpdate(val: string | null) {
    // Emit null if value is the same as default
    if (val != props.default) {
        emit("update", val);
    } else {
        emit("update", null);
    }
}
</script>
