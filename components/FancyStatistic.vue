<template>
    <NStatistic :label="label">
        <template #prefix v-if="prefix">{{ prefix }}</template>

        <!-- Wrap animation in NText if type is defined -->
        <NText v-if="type" :type="type">
            <NNumberAnimation :to="to" :from="from ? from : 0" showSeparator />
        </NText>

        <NNumberAnimation v-else :to="to" :from="from ? from : 0" showSeparator />

        <template #suffix v-if="suffix">{{ suffix }}</template>
    </NStatistic>
</template>

<script setup lang="ts">
defineProps<{
    label?: string,
    type?: "default" | "primary" | "success" | "info" | "warning" | "error",

    prefix?: string,
    suffix?: string,

    to: number,
    from?: number,
}>();
</script>
