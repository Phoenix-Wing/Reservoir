<template>
    <main>
        <NSpace justify="center" style="padding: 1rem 0">
            <NH1>
                <NuxtLink to="/" style="text-decoration: none">
                    <NGradientText type="primary" size="40pt">
                        Reservoir
                    </NGradientText>
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
