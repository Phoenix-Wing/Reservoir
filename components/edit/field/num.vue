<template>
    <NFormItem :label="label" :show-label="label != undefined" :required="!optional">
        <NSwitch v-if="optional" v-model:value="enabled" style="margin-right: 1rem" @update:value="emitInput" />
        <NInputNumber v-model:value="value" :default-value="default" :disabled="!enabled" :placeholder="defaultAsString" :precision="precision">
            <template v-if="suffix" #suffix>{{ suffix }}</template>
        </NInputNumber>
    </NFormItem>
</template>

<script setup lang="ts">
const props = defineProps<{
    default: number | null,
    label?: string,
    optional?: boolean,
    suffix?: string,
    precision?: number,
}>();

const emit = defineEmits<{
    (event: "input:required", val: number | undefined): void,
    (event: "input:optional", val: number | null | undefined): void,
}>();

// Coerce undefined + null to 0
const value = ref(props.default ? props.default : 0);

// If optional, enable if default is not null, else always enable
const enabled = ref(props.optional ? props.default !== null : true);

// Used for input placeholder
const defaultAsString = computed(() => props.default?.toString());

// Default precision to 0 if unspecified (no decimals)
const precision = computed(() => props.precision ? props.precision : 0);

// There's no @input for NInputNumber, so this simulates it
watch(value, emitInput);

function emitInput() {
    // If this is an optional field
    if (props.optional) {
        // If the switch is enabled
        if (enabled.value) {
            // If the value is different from the default
            if (value.value !== props.default) {
                // Emit new value
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
        // Emit new value
        emit("input:required", value.value);
    } else {
        // Emit undefined, no change
        emit("input:required", undefined);
    }
}
</script>
