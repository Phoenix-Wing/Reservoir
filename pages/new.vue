<template>
    <main>
        <NPageHeader @back="navigateTo('/')">
            <template #title>
                <NText type="primary">Create new...</NText>
            </template>

            <template #header>
                <SmartBreadcrumb :routes="breadcrumbRoutes" />
            </template>
        </NPageHeader>

        <NDivider dashed />

        <NGrid :cols="2" :x-gap="12">
            <NGi>
                <NCard title="Country">
                    <NForm>
                        <NFormItem label="Name" required>
                            <NInput v-model:value="countryForm.name" clearable />
                        </NFormItem>

                        <NFormItem label="Leader" required>
                            <NSelect v-model:value="countryForm.leader" :options="membersOptions" :loading="membersPending" filterable>
                                <template v-if="membersError" #action>
                                    <NAlert title="Error fetching members" type="error">
                                        <code>{{ membersError }}</code>
                                    </NAlert>
                                </template>
                            </NSelect>
                        </NFormItem>

                        <NButton @click="async () => await createCountry()" :loading="countryFormLoading">Create</NButton>
                    </NForm>
                </NCard>
            </NGi>

            <NGi>
                <NCard title="Member">
                    <NForm>
                        <NFormItem label="Name" required>
                            <NInput v-model:value="memberForm.name" clearable />
                        </NFormItem>

                        <NFormItem label="In-game name">
                            <NInput v-model:value="memberForm.ig_name" clearable />
                        </NFormItem>

                        <NButton @click="async () => await createMember()" :loading="memberFormLoading">Create</NButton>
                    </NForm>
                </NCard>
            </NGi>
        </NGrid>
    </main>
</template>

<script setup lang="ts">
const message = useMessage();

const breadcrumbRoutes: [string, string][] = [
    ["Reservoir", "/"],
    ["New", "new"],
];

/*
 * Country Form
 */

const { data: members, pending: membersPending, refresh: membersRefresh, error: membersError } = await useLazyFetch("/api/members");

const membersOptions = computed(() => members.value ? members.value.map(x => ({
    label: x.name,
    value: x.id,
})) : []);

const countryForm = reactive<{
    name?: string,
    leader?: string,
}>({});

const countryFormLoading = ref(false);

async function createCountry() {
    countryFormLoading.value = true;

    if (!countryForm.leader || !countryForm.name) {
        message.warning("Please ensure that the country's name and leader are not empty!");
        countryFormLoading.value = false;
        return;
    }

    const { data, error } = await useFetch("/api/new/country", {
        method: "post",
        body: countryForm,
        pick: ["res"],
    });

    if (error.value) {
        message.error("Error creating country. Please see console for more information.")
    } else {
        await navigateTo(`/country/${data.value!.res.id}`);
    }

    countryFormLoading.value = false;
}

/*
 * Member Form
 */

const memberForm = reactive<{
    name?: string,
    ig_name?: string,
}>({});

const memberFormLoading = ref(false);

async function createMember() {
    memberFormLoading.value = true;

    if (!memberForm.name) {
        message.warning("Please ensure that the member's name is not empty!");
        memberFormLoading.value = false;
        return;
    }

    // Replace empty string with undefined
    if (!memberForm.ig_name) memberForm.ig_name = undefined;

    const { error } = await useFetch("/api/new/member", {
        method: "post",
        body: memberForm,
    });

    if (error.value) {
        message.error("Error creating member. Please see console for more information.")
    } else {
        message.info("Member created successfully!");
    }

    await membersRefresh();

    memberFormLoading.value = false;
}
</script>
