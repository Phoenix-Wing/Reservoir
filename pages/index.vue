<template>
    <main>
        <NCard title="Quick actions" embedded>
            <NSpace>
                <IncomeDistributor />
            </NSpace>
        </NCard>

        <NDivider dashed />

        <CountryList />
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
