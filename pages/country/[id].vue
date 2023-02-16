<template>
    <main v-if="country">
        <h1>{{ country.name }}</h1>
        <p v-if="country.leader">
            Run by
            {{ country.leader.name }}
            {{ country.leader.ig_name ? ` (${country.leader.ig_name})` : "" }}
        </p>

        <h2>Gold</h2>

        <p>Income: {{ country?.gold_income }}</p>
        <p>Total: {{ country?.gold_store }}</p>

        <h2>Materials</h2>

        <p>Income: {{ country?.material_income }}</p>
        <p>Total: {{ country?.material_store }}</p>
    </main>

    <main v-else>
        <p>This country does not exist. :(</p>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: country } = await useFetch(`/api/country/${route.params.id}`);
</script>
