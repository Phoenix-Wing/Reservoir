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
                <NewCountryForm ref="countryForm" />
            </NGi>

            <NGi>
                <NewMemberForm @member-created="async () => await countryForm?.refresh()" />
            </NGi>
        </NGrid>
    </main>
</template>

<script setup lang="ts">
import NewCountryForm from "~/components/new/CountryForm.vue";

const breadcrumbRoutes: [string, string][] = [
    ["Reservoir", "/"],
    ["New", "new"],
];

const countryForm = ref<InstanceType<typeof NewCountryForm> | null>(null);
</script>
