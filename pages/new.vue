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
                <NewMemberForm @member-created="async () => await membersRefresh()" />
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

const { data: members, pending: membersPending, refresh: membersRefresh, error: membersError } = await useLazyFetch("/api/members", {
    pick: ["members"],
});

const membersOptions = computed(() => members.value ? members.value.members.map(x => ({
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

    try {
        const data = await $fetch("/api/new/country", {
            method: "post",
            body: countryForm,
            pick: ["res"],
        });

        await navigateTo(`/country/${data.res.id}`)
    } catch {
        message.error("Error creating country. Please see console for more information.");
    }

    countryFormLoading.value = false;
}
</script>
