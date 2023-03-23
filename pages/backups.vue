<template>
    <main>
        <NPageHeader @back="navigateTo('/')">
            <template #title>
                <NText type="primary">Backups</NText>
            </template>

            <template #header>
                <SmartBreadcrumb :routes="breadcrumbRoutes" />
            </template>
        </NPageHeader>

        <NDivider dashed />

        <NCard>
            <NAlert title="Here be dragons!" type="warning">
                This page is a work-in-progress and the functionality is disabled.
                Please come back soon!
            </NAlert>

            <NDivider dashed />

            <NCalendar v-model:value="selectedDate" #="{ year, month, date }" :is-date-disabled="isDateDisabled">
                <span v-if="new Date(year, month - 1, date).getDay() == 2">PW Meeting</span>
            </NCalendar>

            <template #action>
                <NSpace>
                    <NButton disabled>Queue new backup...</NButton>
                    <NButton :disabled="!selectedDate" @click="message.info('This feature is currently disabled.')">Download backup from selected</NButton>
                </NSpace>
            </template>
        </NCard>
    </main>
</template>

<script setup lang="ts">
const message = useMessage();

const breadcrumbRoutes: [string, string][] = [
    ["Reservoir", "/"],
    ["Backups", "/backups"],
];

function isDateDisabled(timestamp: number): boolean {
    let date = new Date(timestamp);

    return date.getDay() != 2;
}

const selectedDate = ref(undefined);
</script>
