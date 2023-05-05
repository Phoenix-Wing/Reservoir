<template>
    <main>
        <NSpace :size="24" vertical>
            <NCard title="Quick actions">
                <NSpace>
                    <IncomeDistributor />
                    <UButtonLink to="/new">Create new...</UButtonLink>
                    <UButtonLink to="/backups" disabled>View backups</UButtonLink>
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
