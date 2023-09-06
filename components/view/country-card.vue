<template>
    <NCard :title="name">
        <template #header-extra>
            <UButtonLink :to="`/country/${id}`">View</UButtonLink>
        </template>

        <NGrid :cols="3">
            <NGi>
                <ViewStat :to="gold" label="Total Gold" suffix="g" />
            </NGi>
        </NGrid>
    </NCard>
</template>

<script setup lang="ts">
defineProps<{
    name: string,
    id: string,
    gold: number,
}>();
</script>
