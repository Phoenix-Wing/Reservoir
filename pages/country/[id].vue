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
            <ErrorDisplay v-if="error" description="Error fetching country data." :details="error" />

            <NEmpty v-else-if="!country" />

            <template v-else>
                <NPageHeader @back="navigateTo('/')" :subtitle="formatLeaderName()">
                    <template #title>
                        <NText type="primary">{{ country.name }}</NText>
                    </template>

                    <template #header>
                        <SmartBreadcrumb :routes="breadcrumbRoute" />
                    </template>

                    <template #extra>
                        <NButton disabled>Edit</NButton>
                    </template>

                    <NCard title="Quick facts">
                        <NGrid :cols="3">
                            <NGi>
                                <NStatistic label="Gold Profit">
                                    <NText type="info"><NNumberAnimation :to="country.gold_profit" /></NText>
                                </NStatistic>
                            </NGi>

                            <NGi>
                                <NStatistic label="Material Profit">
                                    <NText type="info"><NNumberAnimation :to="country.material_profit" /></NText>
                                </NStatistic>
                            </NGi>

                            <NGi>
                                <NStatistic label="Population">
                                    <NText type="info"><NNumberAnimation :to="country.population" /></NText>
                                </NStatistic>
                            </NGi>
                        </NGrid>
                    </NCard>
                </NPageHeader>

                <NDivider dashed />

                <NGrid :cols="3" :x-gap="12" :y-gap="12">
                    <!-- Gold card -->
                    <NGi>
                        <CountryStats title="Gold">
                            <NGi>
                                <FancyStatistic :to="country.gold_store" label="Total" suffix="g" type="primary" />
                            </NGi>
                            <NGi>
                                <NPopover trigger="hover">
                                    <template #trigger>
                                        <FancyStatistic :to="country.gold_profit" label="Profit" suffix="g" />
                                    </template>

                                    <span>Calculated with <code>income - upkeep</code></span>
                                </NPopover>
                            </NGi>
                            <NGi>
                                <FancyStatistic :to="country.gold_income" label="Income" suffix="g" />
                            </NGi>
                            <NGi>
                                <FancyStatistic :to="country.gold_upkeep" label="Upkeep" suffix="g" />
                            </NGi>

                            <template #description>Gold is the universal currency in Phoenix Wing.</template>
                        </CountryStats>
                    </NGi>

                    <!-- Material card -->
                    <NGi>
                        <CountryStats title="Material">
                            <NGi>
                                <FancyStatistic :to="country.material_store" label="Total" suffix="materials" type="primary" />
                            </NGi>
                            <NGi>
                                <NPopover trigger="hover">
                                    <template #trigger>
                                        <FancyStatistic :to="country.material_profit" label="Profit" suffix="materials" />
                                    </template>

                                    <span>Calculated with <code>income - upkeep</code></span>
                                </NPopover>
                            </NGi>
                            <NGi>
                                <FancyStatistic :to="country.material_income" label="Income" suffix="materials" />
                            </NGi>
                            <NGi>
                                <FancyStatistic :to="country.material_upkeep" label="Upkeep" suffix="materials" />
                            </NGi>

                            <template #description>
                                Materials are used to build new structures.
                            </template>
                        </CountryStats>
                    </NGi>

                    <NGi>
                        <NCard title="Population">
                            <NSpace justify="center">
                                <FancyStatistic :to="country.population" label="Total" suffix="people" type="primary" />
                            </NSpace>

                            <template #action>
                                <NText italic depth="3">Population affects how many men you can draft in your military.</NText>
                            </template>
                        </NCard>
                    </NGi>
                </NGrid>
            </template>
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
