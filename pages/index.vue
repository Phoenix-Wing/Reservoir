<template>
    <main>
        <NSpace :size="24" vertical>
            <NCard title="Quick actions">
                <NSpace>
                    <HomeIncomeDistributor />
                    <UButtonLink to="/new">Create new...</UButtonLink>
                    <HomeSearchBar />
                </NSpace>
            </NCard>

            <HomeCountryList />

            <NGrid :cols="2" :x-gap="12">
                <NGi>
                    <LazyHomeMemberList />
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
