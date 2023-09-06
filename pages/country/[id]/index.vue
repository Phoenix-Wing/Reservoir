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
                        <span v-if="country.leaders">
                            <ULeadersDisplay :leaders="country.leaders" color="rgba(255, 255, 255, 0.82)" />
                        </span>
                        <span v-else>
                            No current leaders
                        </span>
                    </template>

                    <NCard title="Quick facts">
                        <NSpace justify="space-around">
                            <ViewStat :to="country.gold.quantity" label="Gold" suffix="g" />
                            <ViewStat :to="country.foodstuffs.quantity" label="Foodstuffs" />
                            <ViewStat :to="country.construction.quantity" label="Construction" />
                            <ViewStat :to="country.luxuries.quantity" label="Luxuries" />
                            <ViewStat :to="country.catalyst.quantity" label="Catalyst" />
                            <ViewStat :to="country.gonslate.quantity" label="Gonslate" />
                        </NSpace>
                    </NCard>
                </NPageHeader>

                <NDivider dashed />

                <NGrid :cols="3" :x-gap="12" :y-gap="12">
                    <NGi>
                        <ViewCurrencyCard title="Gold" :data="country.gold" suffix="g">
                            <template #description>
                                Gold is the universal currency in Phoenix Wing.
                            </template>
                        </ViewCurrencyCard>
                    </NGi>

                    <NGi>
                        <ViewCurrencyCard title="Foodstuffs" :data="country.foodstuffs">
                            <template #description>
                                Foodstuffs are necessary to feed your population.
                            </template>
                        </ViewCurrencyCard>
                    </NGi>

                    <NGi>
                        <ViewCurrencyCard title="Construction" :data="country.construction">
                            <template #description>
                                Construction is used to build things.
                            </template>
                        </ViewCurrencyCard>
                    </NGi>

                    <NGi>
                        <ViewCurrencyCard title="Luxuries" :data="country.luxuries">
                            <template #description>
                                Luxuries keep your nobility happy.
                            </template>
                        </ViewCurrencyCard>
                    </NGi>

                    <NGi>
                        <ViewCurrencyCard title="Catalyst" :data="country.catalyst">
                            <template #description>
                                Common Catalyst resources used by mages.
                            </template>
                        </ViewCurrencyCard>
                    </NGi>

                    <NGi>
                        <ViewCurrencyCard title="Gonslate" :data="country.gonslate">
                            <template #description>
                                A valuable Catalyst fuel used in airships.
                            </template>
                        </ViewCurrencyCard>
                    </NGi>

                    <NGi>
                        <NCard title="Notes">
                            <!-- pre-line makes HTML respect newlines -->
                            <NText :depth="2" style="white-space: pre-line">
                                {{ country.notes || "No current notes..." }}
                            </NText>

                            <template #action>
                                <NText italic depth="3">Notes can be anything that you need to remember for a while.</NText>
                            </template>
                        </NCard>
                    </NGi>
                </NGrid>

                <LazyEditDrawer v-model:show="editing" title="Editing">
                    <NSpace vertical :size="24">
                        <!-- TODO: Consider different title? -->
                        <EditCard title="Country">
                            <EditFieldText :default="country.name" label="Name" @input:required="x => editArgs.name = x" />
                            <EditFieldCountryLeaders :default="country.leaders" label="Leaders" @input="x => editArgs.leaders = x" />
                        </EditCard>

                        <EditCard title="Gold" inline>
                            <EditFieldNum :default="country.gold.quantity" label="Total" @input:required="x => editArgs.gold_quantity = x" />
                            <EditFieldNum :default="country.gold.income" label="Income" @input:required="x => editArgs.gold_income = x" />
                            <EditFieldNum :default="country.gold.upkeep" label="Upkeep" @input:required="x => editArgs.gold_upkeep = x" />
                        </EditCard>

                        <EditCard title="Foodstuffs" inline>
                            <EditFieldNum :default="country.foodstuffs.quantity" label="Total" @input:required="x => editArgs.foodstuffs_quantity = x" />
                            <EditFieldNum :default="country.foodstuffs.income" label="Income" @input:required="x => editArgs.foodstuffs_income = x" />
                            <EditFieldNum :default="country.foodstuffs.upkeep" label="Upkeep" @input:required="x => editArgs.foodstuffs_upkeep = x" />
                        </EditCard>

                        <EditCard title="Construction" inline>
                            <EditFieldNum :default="country.construction.quantity" label="Total" @input:required="x => editArgs.construction_quantity = x" />
                            <EditFieldNum :default="country.construction.income" label="Income" @input:required="x => editArgs.construction_income = x" />
                            <EditFieldNum :default="country.construction.upkeep" label="Upkeep" @input:required="x => editArgs.construction_upkeep = x" />
                        </EditCard>

                        <EditCard title="Luxuries" inline>
                            <EditFieldNum :default="country.luxuries.quantity" label="Total" @input:required="x => editArgs.luxuries_quantity = x" />
                            <EditFieldNum :default="country.luxuries.income" label="Income" @input:required="x => editArgs.luxuries_income = x" />
                            <EditFieldNum :default="country.luxuries.upkeep" label="Upkeep" @input:required="x => editArgs.luxuries_upkeep = x" />
                        </EditCard>

                        <EditCard title="Catalyst" inline>
                            <EditFieldNum :default="country.catalyst.quantity" label="Total" @input:required="x => editArgs.catalyst_quantity = x" />
                            <EditFieldNum :default="country.catalyst.income" label="Income" @input:required="x => editArgs.catalyst_income = x" />
                            <EditFieldNum :default="country.catalyst.upkeep" label="Upkeep" @input:required="x => editArgs.catalyst_upkeep = x" />
                        </EditCard>

                        <EditCard title="Gonslate" inline>
                            <EditFieldNum :default="country.gonslate.quantity" label="Total" @input:required="x => editArgs.gonslate_quantity = x" />
                            <EditFieldNum :default="country.gonslate.income" label="Income" @input:required="x => editArgs.gonslate_income = x" />
                            <EditFieldNum :default="country.gonslate.upkeep" label="Upkeep" @input:required="x => editArgs.gonslate_upkeep = x" />
                        </EditCard>

                        <EditCard title="Notes">
                            <EditFieldText :default="country.notes" type="textarea" :maxlength="500" @input:required="x => editArgs.notes = x" />
                        </EditCard>
                    </NSpace>

                    <template #footer>
                        <NSpace>
                            <NButton
                                :loading="updateCountryPending"
                                type="success"
                                ghost
                                @click="async () => { await updateCountry(); editing = false }"
                            >
                                Save
                            </NButton>
                            <NButton type="error" ghost @click="editing = false">Discard</NButton>
                        </NSpace>
                    </template>
                </LazyEditDrawer>
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
    validate: route => validateUuid(route.params.id),
});

const breadcrumbRoute = computed<[string, string][]>(() => [
    ["Reservoir", "/"],
    ["Country", ""],
    [country.value ? country.value.name : "Loading...", `country/${route.params.id}`],
]);

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
