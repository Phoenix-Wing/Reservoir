<template>
    <main>
        <p><NuxtLink to="/">Return home?</NuxtLink></p>
        <hr />

        <Title>New faction leader</Title>

        <h1>Create new faction leader</h1>

        <label>Name</label>
        <input type="text" placeholder="Name" v-model="factionLeader.name" />

        <br /><br />

        <label>In-game name</label>
        <input type="text" placeholder="In-game name" v-model="factionLeader.ig_name" />

        <br /><br />

        <button @click="async () => { await executeCreation() }">Create!</button>

        <p v-if="creationError">{{ creationError }}</p>

        <DevOnly>
            <hr />
            <code>{{ factionLeader }}</code>
        </DevOnly>
    </main>
</template>

<script setup lang="ts">
interface NewFactionLeader {
    name: string,
    ig_name: string | null,
}

const factionLeader = reactive<NewFactionLeader>({
    name: "",
    ig_name: null,
});

const creationError = ref<string | null>(null);

async function executeCreation() {
    if (factionLeader.name == "") {
        creationError.value = "Faction leader name must be defined!";
        return;
    }

    // TODO
}
</script>
