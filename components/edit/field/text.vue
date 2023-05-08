<template>
    <NFormItem :label="label" :show-label="label != undefined" :required="!optional">
        <NSwitch v-if="optional" v-model:value="enabled" @update:value="emitInput" />
        <NInput @input="emitInput" v-model:value="value" :default-value="default" :disabled="!enabled" />
    </NFormItem>
</template>

<script setup lang="ts">
const props = defineProps<{
    default: string | null,
    label?: string,
    optional?: boolean,
}>();

const emit = defineEmits<{
    (event: "input:required", val: string | undefined): void,
    (event: "input:optional", val: string | null | undefined): void,
}>();

// Coerce null to empty string
const value = ref(props.default ? props.default : "");

// Coerce undefined to false
const optional = computed(() => props.optional === true);
// If optional, enable if default is not null, else always be enabled 
const enabled = ref(optional.value ? props.default !== null : true);

function emitInput() {
    // If this is an optional field
    if (optional.value) {
        // If the switch is enabled
        if (enabled.value) {
            // If the value is different from the default
            if (value.value !== props.default) {
                // Emit the new value
                emit("input:optional", value.value);
            } else {
                // Emit undefined, no change
                emit("input:optional", undefined);
            }
        } else {
            // Emit null, the switch is disabled
            emit("input:optional", null);
        }
    } else {
        // If the value is different from the default
        if (value.value !== props.default) {
            // Emit the new value
            emit("input:required", value.value);
        } else {
            // Emit undefined, no change
            emit("input:required", undefined);
        }
    }
}
</script>
