<template>
    <NSpin :show="pending">
        <NList bordered hoverable>
            <template #header>
                <NH2>Browse countries</NH2>
            </template>

            <!-- If error fetching data -->
            <ErrorDisplay v-if="error" description="Error fetching countries." :details="error" style="margin: 1rem 0" />

            <!-- Else if more than 0 countries -->
            <NListItem v-for="country in data?.countries" v-else-if="data!.total > 0" :key="country.id">
                <template #prefix>
                    <NText type="success" strong>{{ country.name }}</NText>
                </template>

                <div v-if="country.leaders">
                    <ULeadersDisplay :leaders="country.leaders" color="rgba(255, 255, 255, 0.9)" />
                </div>
                <NText v-else italic>
                    No current leaders
                </NText>

                <template #suffix>
                    <UButtonLink :to="`/country/${country.id}`">View</UButtonLink>
                </template>
            </NListItem>

            <!-- Else, countries.length must be 0 -->
            <NEmpty v-else size="huge" description="No countries yet..." style="margin: 1rem 0" />

            <template #footer>
                <NPagination v-model:page="page" :item-count="data?.total" :page-size="PAGE_SIZE" :disabled="error != null" />
            </template>
        </NList>
    </NSpin>
</template>

<script setup lang="ts">
const PAGE_SIZE = 8;

const page = ref(1);

const countryQuery = computed(() => ({
    limit: PAGE_SIZE,
    offset: (page.value - 1) * PAGE_SIZE,
}));

const { data, pending, error } = await useFetch("/api/countries", {
    query: countryQuery,
});
</script>
