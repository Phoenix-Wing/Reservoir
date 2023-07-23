<template>
    <NStatistic :label="label">
        <template v-if="prefix" #prefix>{{ prefix }}</template>

        <!-- Wrap animation in NText if type is defined -->
        <NText v-if="type" :type="type">
            <NNumberAnimation :to="to" :duration="DURATION" show-separator />
        </NText>

        <NNumberAnimation v-else :to="to" :duration="DURATION" show-separator />

        <template v-if="suffix" #suffix>{{ suffix }}</template>
    </NStatistic>
</template>

<script setup lang="ts">
const DURATION = 1000;

defineProps<{
    label?: string,
    type?: "default" | "primary" | "success" | "info" | "warning" | "error",

    prefix?: string,
    suffix?: string,

    to?: number,
}>();
</script>
