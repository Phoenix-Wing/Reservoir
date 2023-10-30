<template>
    <NFormItem :label="label" :show-label="label != undefined" :required="!optional">
        <NSwitch v-if="optional" v-model:value="enabled" style="margin-right: 1rem" @update:value="emitInput" />
        <NInput
            v-model:value="value"
            :default-value="props.default"
            :disabled="!enabled"
            :type="type"
            :maxlength="maxlength"
            :show-count="maxlength !== undefined"
            clearable
            @input="emitInput"
        />
    </NFormItem>
</template>

<script setup lang="ts">
const props = defineProps<{
    default: string | null,
    label?: string,
    optional?: boolean,
    type?: "text" | "textarea",
    maxlength?: number,
}>();

const emit = defineEmits<{
    (event: "input:required", val: string | undefined): void,
    (event: "input:optional", val: string | null | undefined): void,
}>();

// Coerce null to empty string
const value = ref(props.default ? props.default : "");

// If optional, enable if default is not null, else always be enabled
const enabled = ref(props.optional ? props.default !== null : true);

// Default type to "text"
const type = computed(() => props.type ? props.type : "text");

function emitInput() {
    // If this is an optional field
    if (props.optional) {
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
    // If the value is different from the default
    } else if (value.value !== props.default) {
        // Emit the new value
        emit("input:required", value.value);
    } else {
        // Emit undefined, no change
        emit("input:required", undefined);
    }
}
</script>
