<template>
    <NCard :title="title">
        <NGrid :cols="2">
            <NGi>
                <ViewStat :to="data.store" label="Total" :suffix="suffix" />
            </NGi>
            <NGi>
                <NPopover>
                    <template #trigger>
                        <ViewStat :to="data.profit" label="Profit" :suffix="suffix" />
                    </template>

                    <span>Calculated with <code>income - upkeep</code></span>
                </NPopover>
            </NGi>
            <NGi>
                <ViewStat :to="data.income" label="Income" :suffix="suffix" />
            </NGi>
            <NGi>
                <ViewStat :to="data.upkeep" label="Upkeep" :suffix="suffix" />
            </NGi>
        </NGrid>

        <template #action>
            <NText italic depth="3"><slot name="description" /></NText>
        </template>
    </NCard>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    data: {
        store?: number,
        profit?: number,
        income?: number,
        upkeep?: number,
    },
    suffix?: string,
}>();
</script>
