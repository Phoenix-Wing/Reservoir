<template>
    <main>
        <NSpace :size="24" vertical>
            <NCard title="Quick actions">
                <NSpace>
                    <IncomeDistributor />
                    <NButton @click="navigateTo('/new')">Create new...</NButton>
                    <NButton @click="navigateTo('/backups')" disabled>View backups</NButton>
                </NSpace>
            </NCard>

            <CountryList />
            
            <NGrid :cols="2" :x-gap="12">
                <NGi>
                    <MemberList />
                </NGi>
            </NGrid>
        </NSpace>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
