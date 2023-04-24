<template>
    <NList bordered hoverable>
        <template #header>
            <NH2>Browse members</NH2>
        </template>

        <NListItem v-for="member in data">
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
            <!-- Technically disabled, but it looks better without the property -->
            <NPagination />
        </template>
    </NList>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/members");
</script>
