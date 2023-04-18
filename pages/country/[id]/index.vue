<template>
    <main>
        <NSpin :show="pending" description="Fetching country data..." size="large">
            <ErrorDisplay v-if="error" description="Error fetching country data." :details="error" />

            <NEmpty v-else-if="!country" />

            <template v-else>
                <NPageHeader @back="navigateTo('/')">
                    <template #title>
                        <NText type="primary">{{ country.name }}</NText>
                    </template>

                    <template #header>
                        <SmartBreadcrumb :routes="breadcrumbRoute" />
                    </template>

                    <template #extra>
                        <NButton @click="editing = true">Edit</NButton>
                    </template>

                    <template #subtitle>
                        <span v-if="country.leader">
                            <NText depth="1">Lead by {{ country.leader.name }}</NText>
                            <span v-if="country.leader.ig_name"> ({{ country.leader.ig_name }})</span>
                        </span>

                        <span v-else>No current leader</span>
                    </template>

                    <NCard title="Quick facts">
                        <NSpace justify="space-around">
                                <ReStat :to="country.gold_store" label="Total Gold" suffix="g" />
                                <ReStat :to="country.material_store" label="Total Materials" suffix="mat" />
                                <ReStat :to="country.population" label="Population" suffix="people" />
                        </NSpace>
                    </NCard>
                </NPageHeader>

                <NDivider dashed />

                <NGrid :cols="2" :x-gap="12" :y-gap="12">
                    <!-- Gold card -->
                    <NGi>
                        <ReStatCard title="Gold">
                            <NGi>
                                <ReStat :to="country.gold_store" label="Total" suffix="g" />
                            </NGi>
                            <NGi>
                                <NPopover trigger="hover">
                                    <template #trigger>
                                        <ReStat :to="country.gold_profit" label="Profit" suffix="g" />
                                    </template>

                                    <span>Calculated with <code>income - upkeep</code></span>
                                </NPopover>
                            </NGi>
                            <NGi>
                                <ReStat :to="country.gold_income" label="Income" suffix="g" />
                            </NGi>
                            <NGi>
                                <ReStat :to="country.gold_upkeep" label="Upkeep" suffix="g" />
                            </NGi>

                            <template #description>Gold is the universal currency in Phoenix Wing.</template>
                        </ReStatCard>
                    </NGi>

                    <!-- Material card -->
                    <NGi>
                        <ReStatCard title="Materials">
                            <NGi>
                                <ReStat :to="country.material_store" label="Total" suffix="mat" />
                            </NGi>
                            <NGi>
                                <NPopover trigger="hover">
                                    <template #trigger>
                                        <ReStat :to="country.material_profit" label="Profit" suffix="mat" />
                                    </template>

                                    <span>Calculated with <code>income - upkeep</code></span>
                                </NPopover>
                            </NGi>
                            <NGi>
                                <ReStat :to="country.material_income" label="Income" suffix="mat" />
                            </NGi>
                            <NGi>
                                <ReStat :to="country.material_upkeep" label="Upkeep" suffix="mat" />
                            </NGi>

                            <template #description>
                                Materials are used to build new structures.
                            </template>
                        </ReStatCard>
                    </NGi>

                    <NGi>
                        <NCard title="Population">
                            <NSpace justify="center">
                                <ReStat :to="country.population" label="Total" suffix="people" />
                            </NSpace>

                            <template #action>
                                <NText italic depth="3">Population affects how many people you can draft in your military.</NText>
                            </template>
                        </NCard>
                    </NGi>

                    <NGi>
                        <NCard title="Notes">
                            <!-- pre-line makes HTML respect newlines -->
                            <NText :depth="2" style="white-space: pre-line">{{ country.notes || "No current notes..." }}</NText>

                            <template #action>
                                <NText italic depth="3">Notes can be anything that you need to remember for a while.</NText>
                            </template>
                        </NCard>
                    </NGi>
                </NGrid>

                <NDrawer v-model:show="editing" :default-width="502" resizable>
                    <NDrawerContent title="Editing" closable>
                        <NSpace vertical :size="24">
                            <NCard title="Gold">
                                <NForm inline>
                                    <ReNumField @update="x => editArgs.gold_store = x" :default="country.gold_store" label="Total" />
                                    <ReNumField @update="x => editArgs.gold_income = x" :default="country.gold_income" label="Income" />
                                    <ReNumField @update="x => editArgs.gold_upkeep = x" :default="country.gold_upkeep" label="Upkeep" />
                                </NForm>
                            </NCard>

                            <NCard title="Materials">
                                <NForm inline>
                                    <ReNumField @update="x => editArgs.material_store = x" :default="country.material_store" label="Total" />
                                    <ReNumField @update="x => editArgs.material_income = x" :default="country.material_income" label="Income" />
                                    <ReNumField @update="x => editArgs.material_upkeep = x" :default="country.material_upkeep" label="Upkeep" />
                                </NForm>
                            </NCard>

                            <NCard title="Population">
                                <NForm inline>
                                    <ReNumField @update="x => editArgs.population = x" :default="country.population" label="Total" />
                                </NForm>
                            </NCard>

                            <NCard title="Notes">
                                <NForm>
                                    <ReTextBoxField @update="x => editArgs.notes = x" :default="country.notes" :maxlength="500" />
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
const message = useMessage();

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

    try {
        await $fetch(`/api/country/${route.params.id}`, {
            method: "post",
            body: editArgs,
        });
    } catch {
        message.error("There was an error updating country information. Please check console for more information.");
    }

    await refresh();

    updateCountryPending.value = false;
}
</script>
