<template>
    <NList bordered hoverable>
        <template #header>
            <NH2>Browse members</NH2>
        </template>

        <NListItem v-for="member in data?.members">
            <template #prefix>
                {{ member.name }}
            </template>

            <NText :depth="3">
                {{ member.ig_name ? `${member.ig_name},` : "" }}
                {{ member.countries.length == 1 ? `${member.countries.length} country` : `${member.countries.length} countries` }}
            </NText>

            <template #suffix>
                <NButton @click="navigateTo(`/member/${member.id}`)">View</NButton>
            </template>
        </NListItem>

        <template #footer>
            <NPagination v-model:page="page" :item-count="data?.total" :page-size="PAGE_SIZE" />
        </template>
    </NList>
</template>

<script setup lang="ts">
const PAGE_SIZE = 5;

const page = ref(1);

const memberQuery = computed(() => ({
    limit: PAGE_SIZE,
    offset: (page.value - 1) * PAGE_SIZE,
}));

const { data } = await useFetch("/api/members", {
    query: memberQuery,
});
</script>
