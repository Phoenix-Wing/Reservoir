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

        <ClientOnly>
            <NGrid cols="1 m:2" :x-gap="12" responsive="screen">
                <NGi>
                    <NewCountryForm />
                </NGi>
                <NGi>
                    <NewMemberForm />
                </NGi>
            </NGrid>
        </ClientOnly>
    </main>
</template>

<script setup lang="ts">
const breadcrumbRoutes: [string, string][] = [
    ["Reservoir", "/"],
    ["New", "new"],
];
</script>
