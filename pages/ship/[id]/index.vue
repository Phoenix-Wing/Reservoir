<template>
    <main>
        <NSpin :show="pending" description="Fetching ship data..." size="large">
            <ErrorDisplay v-if="error" description="Error fetching ship data." :details="error" />

            <NEmpty v-else-if="!ship" />

            <template v-else>
                <NPageHeader @back="navigateTo('/')">
                    <template #title>
                        <NText type="primary">{{ ship.kind }}</NText>
                    </template>

                    <template #header>
                        <SmartBreadcrumb :routes="breadcrumbRoute" />
                    </template>

                    <template #extra>
                        <NSpace>
                            <NButton :loading="pending" @click="async () => await refresh()">Refresh</NButton>
                            <NButton disabled>Edit</NButton>
                        </NSpace>
                    </template>

                    <template #subtitle>
                        Owned by

                        <NuxtLink v-if="ship.boat_owner" :to="`/country/${ship.boat_owner.id}`">{{ ship.boat_owner.name }}</NuxtLink>
                        <NuxtLink v-else-if="ship.airship_owner" :to="`/country/${ship.airship_owner.id}`">{{ ship.airship_owner.name }}</NuxtLink>
                        <template v-else>no one</template>
                    </template>

                    <NCard title="Quick Stats">
                        <NSpace justify="space-around">
                            <NStatistic label="Kind">
                                {{ ship.kind }}
                            </NStatistic>
                            <NStatistic label="Status">
                                {{ ship.status }}
                            </NStatistic>
                            <NStatistic label="Progress">
                                <span v-if="ship.progress">{{ ship.progress.current }} / {{ ship.progress.total }}</span>
                                <span v-else>N/A</span>

                                <template v-if="ship.progress" #suffix>m</template>
                            </NStatistic>
                        </NSpace>
                    </NCard>
                </NPageHeader>
            </template>
        </NSpin>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: ship, pending, refresh, error } = await useFetch(`/api/ship/${route.params.id}`);

useHead({
    title: () => {
        if (pending.value) {
            return "Fetching ship";
        } else if (error.value) {
            return "Error fetching ship";
        } else {
            return ship.value!.kind;
        }
    },
});

definePageMeta({
    validate: route => validateUuid(route.params.id),
});

const breadcrumbRoute = computed<[string, string][]>(() => [
    ["Reservoir", "/"],
    ["Ship", ""],
    [ship.value ? ship.value.kind : "Loading...", `ship/${route.params.id}`],
]);
</script>
