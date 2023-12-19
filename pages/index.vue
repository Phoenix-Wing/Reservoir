<template>
    <main>
        <NSpace justify="center" style="padding: 1rem 0">
            <NH1>
                <NuxtLink to="/" style="text-decoration: none">
                    <NText type="primary" style="font-size: 40pt">
                        Reservoir
                    </NText>
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

            <NGrid :cols="2" :x-gap="12">
                <NGi>
                    <LazyHomeMemberList />
                </NGi>
                <NGi>
                    <LazyHomeQuickStats />
                </NGi>
            </NGrid>
        </NSpace>
    </main>
</template>
