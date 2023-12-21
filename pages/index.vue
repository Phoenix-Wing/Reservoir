<template>
    <main>
        <NSpace justify="center">
            <NH1>
                <NuxtLink to="/">
                    <img src="~/assets/logo-text.svg" alt="Reservoir" class="title">
                </NuxtLink>
            </NH1>
        </NSpace>

        <NSpace :size="24" vertical>
            <NCard title="Quick actions">
                <NSpace>
                    <HomeIncomeDistributor />
                    <HomeProgressShips />
                    <UButtonLink to="/new">Create new...</UButtonLink>
                    <HomeSearchBar />
                </NSpace>
            </NCard>

            <HomeCountryList />

            <ClientOnly>
                <NGrid cols="1 m:2" :x-gap="12" responsive="screen">
                    <NGi>
                        <LazyHomeMemberList />
                    </NGi>
                    <NGi>
                        <LazyHomeQuickStats />
                    </NGi>
                </NGrid>
            </ClientOnly>
        </NSpace>
    </main>
</template>

<style scoped>
@media (max-width: 700px) {
    .title {
        height: 150px;
    }
}

@media (min-width: 700px) {
    .title {
        height: 200px;
    }
}
</style>
