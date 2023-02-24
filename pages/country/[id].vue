<template>
    <main v-if="country">
        <p><NuxtLink to="/">Return home?</NuxtLink></p>

        <hr />

        <Title>{{ country.name }}</Title>

        <h1>{{ country.name }}</h1>
        <p v-if="country.leader">
            Run by
            {{ country.leader.name }}
            {{ country.leader.ig_name ? ` (${country.leader.ig_name})` : "" }}
        </p>

        <button v-if="!editing" @click="editing = true">Edit country</button>
        <div v-else>
            <button @click="async () => { editing = false; executeChanges() }">Save</button>
            <button @click="editing = false; changes = emptyCountryMutation()">Discard changes</button>
        </div>

        <h2>Gold</h2>

        <div v-if="!editing">
            <p>Income: {{ country.gold_income }}</p>
            <p>Store: {{ country.gold_store }}</p>
        </div>

        <div v-else>
            <SmartField label="Income" :placeholder="country.gold_income" @input="data => changes.gold_income = data" />
            <SmartField label="Store" :placeholder="country.gold_store" @input="data => changes.gold_store = data" />
        </div>

        <h2>Materials</h2>

        <div v-if="!editing">
            <p>Income: {{ country.material_income }}</p>
            <p>Store: {{ country.material_store }}</p>
        </div>

        <div v-else>
            <SmartField label="Income" :placeholder="country.material_income" @input="data => changes.material_income = data" />
            <SmartField label="Store" :placeholder="country.material_store" @input="data => changes.material_store = data" />
        </div>

        <hr />

        <DevOnly>
            <p><code>{{ country }}</code></p>
            <p><code>{{ changes }}</code></p>
        </DevOnly>
    </main>

    <main v-else>
        <p>This country does not exist. :(</p>
        <p><NuxtLink to="/">Return home?</NuxtLink></p>

        <details>
            <summary>Error for nerds</summary>
            <code>{{ error }}</code>
        </details>
    </main>
</template>

<script setup lang="ts">
import { CountryMutation } from "~/utils/mutations";

const route = useRoute();

const editing = useState("editingCountry", () => false);
const changes: Ref<CountryMutation> = ref(emptyCountryMutation());

async function executeChanges() {
    const { error } = await useFetch(`/api/country/${route.params.id}`, {
        method: "post",
        body: changes.value,
    });

    if (error.value != null) {
        showError(error.value);
    }

    changes.value = emptyCountryMutation();

    await refresh();
}

function emptyCountryMutation(): CountryMutation {
    return {
        gold_income: null,
        gold_store: null,
        material_income: null,
        material_store: null,
    };
}

const { data: country, refresh, error } = await useFetch(`/api/country/${route.params.id}`);
</script>
