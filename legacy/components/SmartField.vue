<template>
    <div>
        <label>{{ props.label }}</label>
        <input type="number" :placeholder="props.placeholder.toString()" v-model="data" />
        <button v-if="data != null" @click="data = null; $emit('input', null)">Cancel</button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string,
    placeholder: number,
}>();

const emit = defineEmits<{
    (e: "input", data: number | null): void,
}>();

const data = ref<number | null>(null);

watch(data, async () => {
    emit("input", data.value);
});
</script>
