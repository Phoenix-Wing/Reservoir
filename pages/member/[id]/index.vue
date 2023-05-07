<template>
    <main>
        <NSpin :show="pending" description="Fetching member data..." size="large">
            <ErrorDisplay v-if="error" description="Error fetching member data." :details="error" />

            <NEmpty v-else-if="!member" />

            <template v-else>
                <NPageHeader @back="navigateTo('/')">
                    <template #title>
                        <NText type="primary">{{ member.name }}</NText>
                    </template>

                    <template #header>
                        <SmartBreadcrumb :routes="breadcrumbRoute" />
                    </template>

                    <template #extra>
                        <NButton @click="editing = true">Edit</NButton>
                    </template>

                    <template #subtitle v-if="member.ig_name">
                        {{ member.ig_name }}
                    </template>

                    <NCard title="Quick facts">
                        <NSpace justify="space-around">
                            <ViewStat :to="member.sum_gold" label="Available Gold" suffix="g" />
                            <ViewStat :to="member.sum_materials" label="Available Materials" suffix="mat" />
                        </NSpace>
                    </NCard>
                </NPageHeader>
                
                <NDivider dashed />

                <NGrid :cols="2" :x-gap="12" :y-gap="12">
                    <NGi v-if="member.countries.length == 0">
                        <NCard>
                            <NEmpty description="This member does not have any countries." size="large">
                                <template #extra>
                                    <UButtonLink to="/new">Create a new country</UButtonLink>
                                </template>
                            </NEmpty>
                        </NCard>
                    </NGi>

                    <NGi v-else v-for="country in member.countries">
                        <ViewCountryCard :name="country.name" :id="country.id" :gold="country.gold_store" :materials="country.material_store" />
                    </NGi>
                </NGrid>

                <EditDrawer v-model:show="editing" title="Editing">
                    <NSpace vertical :size="24">
                        <EditCard title="Character">
                            <ReTextField @update="x => editArgs.name = x" :default="member.name" label="Name" />

                            <NPopover trigger="hover" :delay="500">
                                <template #trigger>
                                    <NFormItem label="In-Game Name">
                                        <NInput type="text" :defaultValue="member.ig_name" disabled />
                                    </NFormItem>
                                </template>
                                <span>Not yet implemented. Please see <NuxtLink to="https://github.com/Phoenix-Wing/Reservoir/issues/8" target="_blank">#8</NuxtLink>.</span>
                            </NPopover>
                        </EditCard>

                        <NCard title="Countries">
                            <NTransfer v-model:value="selectedCountries" :options="countriesTransferOptions" source-filterable disabled />
                        </NCard>
                    </NSpace>

                    <template #footer>
                        <NSpace>
                            <NButton @click="async () => { await updateMember(); editing = false }" :loading="updateMemberPending" type="success" ghost>Save</NButton>
                            <NButton @click="editing = false" type="error" ghost>Discard</NButton>
                        </NSpace>
                    </template>
                </EditDrawer>
            </template>
        </NSpin>
    </main>
</template>

<script setup lang="ts">
import { UpdateMemberArgs } from "~/server/api/member/[id].post";

const route = useRoute();
const message = useMessage();

const { data: member, pending, refresh, error } = await useFetch(`/api/member/${route.params.id}`);

/*
 * VIEWING
 */

useHead({
    title: () => {
        if (pending.value) {
            return "Fetching member";
        } else if (error.value) {
            return "Error fetching member";
        } else {
            return member.value!.name;
        }
    }
});

definePageMeta({
    validate: async (route) => validateUuid(route.params.id),
});

const breadcrumbRoute: [string, string][] = [
    ["Reservoir", "/"],
    ["Member", ""],
    [member.value ? member.value.name : "Loading...", `member/${route.params.id}`],
];

/*
 * EDITING
 */

const editing = ref(false);
const editArgs = reactive<UpdateMemberArgs>({});
const updateMemberPending = ref(false);

const { data: countries } = await useFetch("/api/countries");

const countriesTransferOptions = computed(() => countries.value?.map(x => ({
    label: x.name,
    value: x.id,
    disabled: x.leader ? x.leader.id != route.params.id : false,
})));

const selectedCountries = ref(member.value ? member.value.countries.map(x => x.id) : []);

async function updateMember() {
    updateMemberPending.value = true;

    // TODO: $fetch
    try {
        await $fetch(`/api/member/${route.params.id}`, {
            method: "post",
            body: editArgs,
        });
    } catch {
        message.error("There was an error updating member information. Please check console for more information.");
    }

    await refresh();

    updateMemberPending.value = false;
}
</script>
