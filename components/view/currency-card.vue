<template>
    <UCard :title="title" :style="kind === 'error' ? 'border-color: rgb(208, 58, 82)' : {}">
        <template #header-extra>
            <slot name="header-extra" />
        </template>

        <NGrid :cols="2">
            <NGi>
                <ViewStat :to="data.quantity" label="Total" :suffix="suffix" />
            </NGi>
            <NGi>
                <NPopover>
                    <template #trigger>
                        <ViewStat :to="data.profit" label="Profit" :suffix="suffix" />
                    </template>

                    <span><slot name="profitPopover">Calculated with <code>income - upkeep</code></slot></span>
                </NPopover>
            </NGi>
            <NGi>
                <ViewStat :to="data.income" label="Income" :suffix="suffix" />
            </NGi>
            <NGi>
                <ViewStat :to="data.upkeep" label="Upkeep" :suffix="suffix" />
            </NGi>
        </NGrid>

        <!-- Thanks! https://stackoverflow.com/a/44077358 -->
        <template v-if="$slots.description" #action>
            <NText italic depth="3"><slot name="description" /></NText>
        </template>
    </UCard>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    data: {
        quantity?: number,
        profit?: number,
        income?: number,
        upkeep?: number,
    },
    suffix?: string,
    kind?: "default" | "error",
}>();
</script>
