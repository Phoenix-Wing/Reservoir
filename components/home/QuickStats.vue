<template>
    <NSpin :show="pending">
        <NCard title="Quick Stats">
            <ErrorDisplay v-if="error" description="Error fetching quick stats." :details="error" />

            <NGrid v-else :cols="2" :x-gap="12" :y-gap="12">
                <NGi>
                    <ViewStat :to="data?.countries" label="Countries" />
                </NGi>
                <NGi>
                    <ViewStat :to="data?.members" label="Members" />
                </NGi>
                <NGi>
                    <ViewStat :to="data?.gold_quantity" label="Gold Quantity" />
                </NGi>
                <NGi>
                    <ViewStat :to="data?.gold_profit" label="Gold Profit" />
                </NGi>
            </NGrid>

            <template #action>
                <NText italic depth="3">These are stats aggregated from all countries and members.</NText>
            </template>
        </NCard>
    </NSpin>
</template>

<script setup lang="ts">
const { data, pending, error } = await useLazyFetch("/api/quick-stats");
</script>
