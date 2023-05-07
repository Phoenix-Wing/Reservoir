<template>
    <NCard :title="name">
        <template #header-extra>
            <UButtonLink :to="`/country/${id}`">View</UButtonLink>
        </template>

        <NGrid :cols="2">
            <NGi>
                <ViewStat :to="gold" label="Total Gold" suffix="g" />
            </NGi>
            <NGi>
                <ViewStat :to="materials" label="Total Materials" suffix="mat" />
            </NGi>
        </NGrid>
    </NCard>
</template>

<script setup lang="ts">
defineProps<{
    name: string,
    id: string,
    gold: number,
    materials: number,
}>();
</script>
