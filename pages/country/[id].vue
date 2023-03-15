<template>
    <main>
        <Title>
            {{ pending ? "Fetching country" : (error ? "Error fetching country" : country!.name) }}
            <!--
                If pending or error, so say, else, say country name.

                This comment is below the tag due to an issue with Nuxt.
                https://github.com/nuxt/nuxt/issues/19716
            -->
        </Title>

        <NSpin :show="pending" description="Fetching country data..." size="large">
            <NPageHeader v-if="!error" @back="navigateTo('/')" :subtitle="formatLeaderName()">
                <template #title>
                    <NText type="primary">{{ country?.name }}</NText>
                </template>

                <template #header>
                    <SmartBreadcrumb :routes="breadcrumbRoute" />
                </template>

                <template #extra>
                    <NButton disabled>Edit</NButton>
                </template>

                <NCard>
                    <NGrid :cols="5">
                        <NGi>
                            <NStatistic label="Total Gold">
                                <NNumberAnimation :to="country?.gold_store" />
                            </NStatistic>
                        </NGi>

                        <NGi>
                            <NStatistic label="Gold Income">
                                <template #prefix>+</template>
                                <NNumberAnimation :to="country?.gold_income" />
                            </NStatistic>
                        </NGi>

                        <NGi>
                            <NStatistic label="Total Materials">
                                <NNumberAnimation :to="country?.material_store" />
                            </NStatistic>
                        </NGi>

                        <NGi>
                            <NStatistic label="Material Income">
                                <template #prefix>+</template>
                                <NNumberAnimation :to="country?.material_income" />
                            </NStatistic>
                        </NGi>

                        <NGi>
                            <NStatistic label="Population">
                                <NNumberAnimation :to="country?.population" />
                            </NStatistic>
                        </NGi>
                    </NGrid>
                </NCard>
            </NPageHeader>

            <ErrorDisplay v-else description="Error fetching country data." :details="error" />
        </NSpin>
    </main>
</template>

<script setup lang="ts">
// Setup composables and functions
const route = useRoute();

function formatLeaderName(): string {
    if (country.value?.leader) {
        // "Lead by <NAME>"
        // "Lead by <NAME> ([IG_NAME])"
        return `Lead by ${country.value.leader.name}` + (country.value.leader.ig_name ? ` (${country.value.leader.ig_name})` : "");
    } else {
        return "No current leader";
    }
}

// Fetch country data
const { data: country, pending, error } = await useFetch(`/api/country/${route.params.id}`);

// Due to its use of country, this needs to be after useFetch
const breadcrumbRoute: [string, string][] = [
    ["Reservoir", "/"],
    ["Country", ""],
    [country.value ? country.value.name : "Loading...", `country/${route.params.id}`],
];
</script>
