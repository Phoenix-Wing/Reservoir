<template>
    <NSpin :show="pending">
        <NList bordered hoverable>
            <template #header>
                <NH2>Browse members</NH2>
            </template>

            <ErrorDisplay v-if="error" description="Error fetching members." :details="error" style="margin: 1rem 0" />

            <NListItem v-for="member in data?.members" v-else-if="(data ? data.total : 0) > 0" :key="member.id">
                <template #prefix>
                    {{ member.name }}
                </template>

                <NText :depth="3">
                    {{ member.ig_name ? `${member.ig_name},` : "" }}
                    {{ member.countries.length == 1 ? `${member.countries.length} country` : `${member.countries.length} countries` }}
                </NText>

                <template #suffix>
                    <UButtonLink :to="`/member/${member.id}`">View</UButtonLink>
                </template>
            </NListItem>

            <NEmpty v-else size="huge" description="No members yet..." style="margin: 1rem 0" />

            <template #footer>
                <NPagination v-model:page="page" :item-count="data?.total" :page-size="PAGE_SIZE" :disabled="error != null" />
            </template>
        </NList>
    </NSpin>
</template>

<script setup lang="ts">
const PAGE_SIZE = 5;

const page = ref(1);

const memberQuery = computed(() => ({
    limit: PAGE_SIZE,
    offset: (page.value - 1) * PAGE_SIZE,
}));

const { data, pending, error } = await useLazyFetch("/api/members", {
    query: memberQuery,
});
</script>
