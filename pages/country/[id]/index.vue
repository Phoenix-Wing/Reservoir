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
                        <NButton @click="editing = true">Edit</NButton>
                    </template>

                    <NCard title="Quick facts">
                        <NSpace justify="space-around">
                                <FancyStatistic :to="country.gold_store" label="Total Gold" suffix="g" />
                                <FancyStatistic :to="country.material_store" label="Total Materials" suffix="mat" />
                                <FancyStatistic :to="country.population" label="Population" suffix="people" />
                        </NSpace>
                    </NCard>
                </NPageHeader>

                <NDivider dashed />

                <NGrid :cols="2" :x-gap="12" :y-gap="12">
                    <!-- Gold card -->
                    <NGi>
                        <CountryStats title="Gold">
                            <NGi>
                                <FancyStatistic :to="country.gold_store" label="Total" suffix="g" />
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
                                <FancyStatistic :to="country.material_store" label="Total" suffix="mat" />
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
                                <FancyStatistic :to="country.population" label="Total" suffix="people" />
                            </NSpace>

                            <template #action>
                                <NText italic depth="3">Population affects how many people you can draft in your military.</NText>
                            </template>
                        </NCard>
                    </NGi>
                </NGrid>

                <NDrawer v-model:show="editing" :default-width="502" resizable>
                    <NDrawerContent title="Editing" closable>
                        <NSpace vertical :size="24">
                            <NCard title="Gold">
                                <NForm inline>
                                    <FormNumberField @update="x => editArgs.gold_store = x" :default="country.gold_store" label="Total" />
                                    <FormNumberField @update="x => editArgs.gold_income = x" :default="country.gold_income" label="Income" />
                                    <FormNumberField @update="x => editArgs.gold_upkeep = x" :default="country.gold_upkeep" label="Upkeep" />
                                </NForm>
                            </NCard>

                            <NCard title="Materials">
                                <NForm inline>
                                    <FormNumberField @update="x => editArgs.material_store = x" :default="country.material_store" label="Total" />
                                    <FormNumberField @update="x => editArgs.material_income = x" :default="country.material_income" label="Income" />
                                    <FormNumberField @update="x => editArgs.material_upkeep = x" :default="country.material_upkeep" label="Upkeep" />
                                </NForm>
                            </NCard>

                            <NCard title="Population">
                                <NForm inline>
                                    <FormNumberField @update="x => editArgs.population = x" :default="country.population" label="Total" />
                                </NForm>
                            </NCard>
                        </NSpace>

                        <template #footer>
                            <NSpace>
                                <NButton @click="async () => { await updateCountry(); editing = false }" :loading="updateCountryPending" type="success" ghost>Save</NButton>
                                <NButton @click="editing = false" type="error" ghost>Discard</NButton>
                            </NSpace>
                        </template>
                    </NDrawerContent>
                </NDrawer>
            </template>
        </NSpin>
    </main>
</template>

<script setup lang="ts">
import { UpdateCountryArgs } from "~/server/api/country/[id].post";

const route = useRoute();

// Fetch country data
const { data: country, pending, refresh, error } = await useFetch(`/api/country/${route.params.id}`);

/*
 * VIEWING
 */

// Sets page title
useHead({
    title: () => {
        if (pending.value) {
            return "Fetching country";
        } else if (error.value) {
            return "Error fetching country";
        } else {
            return country.value!.name;
        }
    },
});

definePageMeta({
    // Assert :id is valid uuid
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

// Due to its use of country, this needs to be after useFetch
const breadcrumbRoute: [string, string][] = [
    ["Reservoir", "/"],
    ["Country", ""],
    [country.value ? country.value.name : "Loading...", `country/${route.params.id}`],
];

/*
 * EDITING
 */

const editing = ref(false);
const editArgs = reactive<UpdateCountryArgs>({});
const updateCountryPending = ref(false);

async function updateCountry() {
    updateCountryPending.value = true;

    await useFetch(`/api/country/${route.params.id}`, {
        method: "post",
        body: editArgs,
    });

    await refresh();

    updateCountryPending.value = false;
}
</script>