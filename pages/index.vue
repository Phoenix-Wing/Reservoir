<template>
    <main>
        <NSpace :size="24" vertical>
            <NCard title="Quick actions" embedded>
                <NSpace>
                    <IncomeDistributor />
                    <NButton @click="navigateTo('/new')">Create new...</NButton>
                </NSpace>
            </NCard>

            <CountryList />
        </NSpace>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
