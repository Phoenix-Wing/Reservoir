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

                    <template v-if="member.ig_name" #subtitle>
                        {{ member.ig_name }}
                    </template>

                    <NCard title="Quick facts">
                        <NSpace justify="space-around">
                            <ViewStat :to="member.gold_sum" label="Available Gold" suffix="g" />

                            <!-- TODO: Remove eventually :P -->
                            <NStatistic label="Nothing else here">
                                :P
                            </NStatistic>
                        </NSpace>
                    </NCard>
                </NPageHeader>

                <NDivider dashed />

                <NGrid :cols="3" :x-gap="12" :y-gap="12">
                    <NGi v-if="member.countries.length == 0">
                        <NCard>
                            <NEmpty description="This member does not have any countries." size="large">
                                <template #extra>
                                    <UButtonLink to="/new">Create a new country</UButtonLink>
                                </template>
                            </NEmpty>
                        </NCard>
                    </NGi>

                    <NGi v-for="country in member.countries" v-else :key="country.id">
                        <ViewCountryCard :id="country.id" :name="country.name" :gold="country.gold_quantity" />
                    </NGi>
                </NGrid>

                <LazyEditDrawer v-model:show="editing" title="Editing">
                    <NSpace vertical :size="24">
                        <EditCard title="Character">
                            <EditFieldText :default="member.name" label="Name" @input:required="x => editArgs.name = x" />
                            <EditFieldText :default="member.ig_name" label="In-Game Name" optional @input:optional="x => editArgs.ig_name = x" />
                        </EditCard>
                    </NSpace>

                    <template #footer>
                        <NSpace>
                            <NButton :loading="updateMemberPending" type="success" ghost @click="async () => { await updateMember(); editing = false }">Save</NButton>
                            <NButton type="error" ghost @click="editing = false">Discard</NButton>
                        </NSpace>
                    </template>
                </LazyEditDrawer>
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
    },
});

definePageMeta({
    validate: route => validateUuid(route.params.id),
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
// Ref for overwriting capabilities, see #41
const editArgs = ref<UpdateMemberArgs>({});
const updateMemberPending = ref(false);

async function updateMember() {
    updateMemberPending.value = true;

    try {
        await $fetch(`/api/member/${route.params.id}`, {
            method: "post",
            body: editArgs.value,
        });
    } catch {
        message.error("There was an error updating member information. Please check console for more information.");
    }

    await refresh();

    // Clear edit args so they don't persist, see #41
    editArgs.value = {};
    updateMemberPending.value = false;
}
</script>
