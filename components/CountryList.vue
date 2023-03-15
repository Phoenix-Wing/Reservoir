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
        <NResult v-if="error" status="error" title="Error" description="Error fetching countries." style="margin-top: 1rem; margin-bottom: 1rem">
            <template #footer>
                <NButton @click="viewErrorDetails = !viewErrorDetails" type="error" ghost>
                    {{ viewErrorDetails ? "Hide error details" : "View error details" }}
                </NButton>
                <pre v-if="viewErrorDetails"><code>{{ error }}</code></pre>
            </template>
        </NResult>

        <!-- Else if more than 0 countries -->
        <NListItem v-else-if="data!.length > 0" v-for="country in data">
            <template #prefix>
                <NText type="success" strong>{{ country.name }}</NText>
            </template>

            <div v-if="country.leader">
                Lead by {{ country.leader.name }} {{ country.leader.ig_name ? `(${country.leader.ig_name})` : "" }}
            </div>
            <NText v-else italic>
                No current leader
            </NText>

            <template #suffix>
                <NButton @click="navigateTo(`/country/${country.id}`)" type="info" secondary>View</NButton>
            </template>
        </NListItem>

        <!-- Else, countries.length must be 0 -->
        <NEmpty v-else size="huge" description="No countries yet..." style="margin-top: 1rem; margin-bottom: 1rem" />
    </NList>
</template>

<script setup lang="ts">
const viewErrorDetails = ref(false);

const { data, pending, error } = await useFetch("/api/countries");
</script>
