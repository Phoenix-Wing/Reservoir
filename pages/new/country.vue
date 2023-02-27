<template>
    <main>
        <p><NuxtLink to="/">Return home?</NuxtLink></p>
        <hr />

        <Title>New country</Title>

        <h1>Create new country</h1>

        <label>Name</label>
        <input type="text" placeholder="Name" v-model="country.name" />

        <br /><br />

        <fieldset>
            <legend>Faction leader</legend>

            <div v-if="!pending">
                <div v-for="leader in factionLeaders">
                    <input type="radio" name="factionLeader" v-model="country.leader" :value="leader.id" />
                    <label>{{ leader.name }}{{ leader.ig_name ? ` (${leader.ig_name})` : "" }}</label>
                </div>
            </div>

            <p v-else>Loading faction leaders...</p>
        </fieldset>

        <br />

        <label>Population</label>
        <input type="number" placeholder="Population" v-model="country.population" />

        <br /><br />

        <button @click="async () => { await executeCreation() }">Create!</button>

        <p v-if="creationError">Error: {{ creationError }}</p>

        <DevOnly>
            <hr />
            <code>{{ country }}</code>
        </DevOnly>
    </main>
</template>

<script setup lang="ts">
interface NewCountry {
    name: string,
    leader: string | null,
    population: number | null,
}

const country = reactive<NewCountry>({
    name: "",
    leader: null,
    population: null,
});

const creationError = ref<string | null>(null);

async function executeCreation() {
    if (country.name == "") {
        creationError.value = "Country name must be defined!";
        return;
    }

    // TODO
}

const { pending, data: factionLeaders } = await useLazyFetch("/api/faction-leaders");
</script>
