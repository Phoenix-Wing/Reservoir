<template>
    <NFormItem :label="label">
        <NInput type="text" @update:value=" emitUpdate " :defaultValue="default" :maxlength=" maxlength " :showCount=" showCount "
            clearable />
    </NFormItem>
</template> 

<script setup lang="ts">
const props = defineProps<{
    default: string,
    label?: string,
    maxlength?: string,
}>();

const emit = defineEmits<{
    (event: "update", val: string | null): void,
}>();

function emitUpdate(val: string | null) {
    if (val != props.default) {
        emit("update", val);
    } else {
        emit("update", null);
    }
}

const showCount = computed(() => {
    return props.maxlength ? true : false;
});
</script>
