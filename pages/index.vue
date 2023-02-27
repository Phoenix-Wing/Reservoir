<template>
    <main>
        <h1>Reservoir</h1>

        <div v-if="incomeConfirmation">
            <p>Are you sure?</p>
            <p>
                <button @click="async () => { incomeConfirmation = false; await distributeIncome() }">Yes, distribute income</button>
                <button @click="incomeConfirmation = false">No, don't do it</button>
            </p>
        </div>
        <div v-else>
            <button v-if="!hasDistributedIncome" @click="incomeConfirmation = true">Distribute income</button>
            <p v-else>Distributed income to countries.</p>
        </div>

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
const incomeConfirmation = ref(false);
const hasDistributedIncome = ref(false);

async function distributeIncome() {
    const { error } = await useFetch("/api/income", {
        method: "post",
        body: { target: "all" },
    });


    if (error.value != null) {
        showError(error.value);
    }

    hasDistributedIncome.value = true;
}

const { pending, data: countries } = await useLazyFetch("/api/countries");
</script>
