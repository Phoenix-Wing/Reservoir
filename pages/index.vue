<template>
    <main>
        <h1>Reservoir</h1>

        <h2>Browse Countries</h2>

        <div v-if="pending">
            <p>Loading countries...</p>
        </div>
        <ul v-else>
            <li v-for="country in countries">
                <NuxtLink :to="`/country/${country.id}`">
                    {{ country.name }}
                    {{ country.leader ? ` - ${country.leader.name}` : "" }}
                    {{ country.leader?.ig_name ? ` (${country.leader.ig_name})` : "" }}
                </NuxtLink>
            </li>
        </ul>
    </main>
</template>

<script setup lang="ts">
const { pending, data: countries } = await useLazyFetch("/api/countries");
</script>
