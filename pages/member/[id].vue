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
                        <NButton disabled>Edit</NButton>
                    </template>

                    <template #subtitle v-if="member.ig_name">
                        {{ member.ig_name }}
                    </template>

                    <NCard title="Quick facts">
                        <NSpace justify="space-around">
                            <ReStat :to="member.sum_gold" label="Available Gold" suffix="g" />
                            <ReStat :to="member.sum_materials" label="Available Materials" suffix="mat" />
                        </NSpace>
                    </NCard>

                    <NDivider dashed />

                    <NGrid :cols="2" :x-gap="12" :y-gap="12">
                        <NGi v-if="member.countries.length == 0">
                            <NCard>
                                <NEmpty description="This member does not have any countries." size="large">
                                    <template #extra>
                                        <NButton @click="navigateTo('/new')">Create a new country</NButton>
                                    </template>
                                </NEmpty>
                            </NCard>
                        </NGi>

                        <NGi v-else v-for="country in member.countries">
                            <NCard :title="country.name">
                                <template #header-extra>
                                    <NButton @click="navigateTo(`/country/${country.id}`)">View</NButton>
                                </template>

                                <NGrid :cols="2">
                                    <NGi><ReStat label="Total Gold" suffix="g" :to="country.gold_store" /></NGi>
                                    <NGi><ReStat label="Total Materials" suffix="mat" :to="country.material_store" /></NGi>
                                </NGrid>
                            </NCard>
                        </NGi>
                    </NGrid>
                </NPageHeader>
            </template>
        </NSpin>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: member, pending, error } = await useFetch(`/api/member/${route.params.id}`);

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
</script>
