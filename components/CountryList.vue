<template>
    <NSpin v-if="pending">
        <!-- Loading spinner around empty list -->

        <NList bordered>
            <template #header>
                <NH2>Browse countries</NH2>
            </template>
        </NList>
    </NSpin>

    <NList v-else bordered hoverable>
        <template #header>
            <NH2>Browse countries</NH2>
        </template>

        <!-- If error fetching data -->
        <ErrorDisplay v-if="error" description="Error fetching countries." :details="error" style="margin: 1rem 0" />

        <!-- Else if more than 0 countries -->
        <NListItem v-else-if="data!.length > 0" v-for="country in data">
            <template #prefix>
                <NText type="success" strong>{{ country.name }}</NText>
            </template>

            <div v-if="country.leader">
                Lead by {{ country.leader.name }}
                <NText v-if="country.leader.ig_name" depth="3">({{ country.leader.ig_name }})</NText>
            </div>
            <NText v-else italic>
                No current leader
            </NText>

            <template #suffix>
                <NButton @click="navigateTo(`/country/${country.id}`)">View</NButton>
            </template>
        </NListItem>

        <!-- Else, countries.length must be 0 -->
        <NEmpty v-else size="huge" description="No countries yet..." style="margin: 1rem 0" />
    </NList>
</template>

<script setup lang="ts">
const { data, pending, error } = await useFetch("/api/countries");
</script>
