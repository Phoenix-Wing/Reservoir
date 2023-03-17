<template>
    <main>
        <NSpin :show="pending" description="Fetching country data..." size="large">
            <ErrorDisplay v-if="error" description="Error fetching country data." :details="error" />

            <NEmpty v-else-if="!country" />

            <template v-else>
                <NPageHeader @back="navigateTo('/')" :subtitle="leaderNameDisplay">
                    <template #title>
                        <NText type="primary">{{ country.name }}</NText>
                    </template>

                    <template #header>
                        <SmartBreadcrumb :routes="breadcrumbRoute" />
                    </template>

                    <template #extra>
                        <NButton @click="navigateTo(`/country/${$route.params.id}/edit`)">Edit</NButton>
                    </template>

                    <NCard title="Quick facts">
                        <NGrid :cols="3">
                            <NGi>
                                <FancyStatistic :to="country.gold_profit" label="Gold Profit" suffix="g" type="info" />
                            </NGi>
                            <NGi>
                                <FancyStatistic :to="country.material_profit" label="Material Profit" suffix="mat" type="info" />
                            </NGi>
                            <NGi>
                                <FancyStatistic :to="country.population" label="Population" suffix="people" type="info" />
                            </NGi>
                        </NGrid>
                    </NCard>
                </NPageHeader>

                <NDivider dashed />

                <NGrid :cols="2" :x-gap="12" :y-gap="12">
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
                        <CountryStats title="Materials">
                            <NGi>
                                <FancyStatistic :to="country.material_store" label="Total" suffix="mat" type="primary" />
                            </NGi>
                            <NGi>
                                <NPopover trigger="hover">
                                    <template #trigger>
                                        <FancyStatistic :to="country.material_profit" label="Profit" suffix="mat" />
                                    </template>

                                    <span>Calculated with <code>income - upkeep</code></span>
                                </NPopover>
                            </NGi>
                            <NGi>
                                <FancyStatistic :to="country.material_income" label="Income" suffix="mat" />
                            </NGi>
                            <NGi>
                                <FancyStatistic :to="country.material_upkeep" label="Upkeep" suffix="mat" />
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
                                <NText italic depth="3">Population affects how many people you can draft in your military.</NText>
                            </template>
                        </NCard>
                    </NGi>
                </NGrid>
            </template>
        </NSpin>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();

definePageMeta({
    // Asset :id is valid uuid
    validate: async (route) => {
        let id = "";

        if (Array.isArray(route.params.id)) {
            id = route.params.id[0];
        } else {
            id = route.params.id;
        }

        // https://ihateregex.io/expr/uuid/
        return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(id);
    },
});

const leaderNameDisplay = computed(() => {
    if (country.value?.leader) {
        // "Lead by <NAME>"
        // "Lead by <NAME> ([IG_NAME])"
        return `Lead by ${country.value.leader.name}` + (country.value.leader.ig_name ? ` (${country.value.leader.ig_name})` : "");
    } else {
        return "No current leader";
    }
});

// Fetch country data
const { data: country, pending, error } = await useFetch(`/api/country/${route.params.id}`);

// Sets page title
useHead({
    title: pending.value ? "Fetching country" : (error.value ? "Error fetching country" : country.value!.name),
});

// Due to its use of country, this needs to be after useFetch
const breadcrumbRoute: [string, string][] = [
    ["Reservoir", "/"],
    ["Country", ""],
    [country.value ? country.value.name : "Loading...", `country/${route.params.id}`],
];
</script>
