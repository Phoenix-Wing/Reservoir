<template>
    <NFormItem :label="label" :show-label="label != undefined">
        <NSelect
            v-model:value="value"
            :options="options"
            :loading="pending"
            multiple
            filterable
            clearable
        >
            <template v-if="error" #action>
                <NAlert title="Error fetching members" type="error">
                    <code>{{ error }}</code>
                </NAlert>
            </template>
        </NSelect>
    </NFormItem>
</template>

<script setup lang="ts">
const props = defineProps<{
    default: {
        id: string,
    }[],
    label?: string,
}>();

const emit = defineEmits<{
    (event: "input", val: string[] | undefined): void,
}>();

const { data: rawOptions, pending, error } = useFetch("/api/members", {
    pick: ["members"],
});

const default_ = computed(() => props.default.map(x => x.id));

const value = ref(default_.value);

const options = computed(() => rawOptions.value?.members.map(x => ({
    label: x.name,
    value: x.id,
})));

// on-update for <NSelect /> is bugged, watch the actual value for change instead
watch(value, emitInput);

function emitInput() {
    // Check that the lengths of both arrays are equal and that they contain the same values
    const isEqual = value.value.length === default_.value.length &&
        value.value.every(i => default_.value.includes(i));

    if (isEqual) {
        // No change, emit undefined
        emit("input", undefined);
    } else {
        // Something changed! Emit the new value
        emit("input", value.value);
    }
}
</script>
