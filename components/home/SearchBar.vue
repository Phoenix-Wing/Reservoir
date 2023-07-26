<template>
    <NAutoComplete
        v-model:value="value"
        :options="suggestions"
        :placeholder="errorFeedback.placeholder"
        :status="errorFeedback.status"
        :loading="pending"
        :input-props="{ autocomplete: 'off' }"
        clearable
        @select="x => navigateTo(x as string)"
    />
</template>

<script setup lang="ts">
const { data, pending, error } = await useLazyFetch("/api/search");

const value = ref("");

// Configures color and placeholder when fetching data fails.
const errorFeedback = computed<{ status?: "error", placeholder: string }>(() => error.value
    ? { status: "error", placeholder: "An error occured." }
    : { placeholder: "Search..." });

// Full, unfiltered list of options.
const urlList = computed(() => data.value?.map(x => ({
    label: x.name,
    value: `/${x.kind === "Country" ? "country" : "member"}/${x.id}`,
})));

// Case-insensitive, filtered list of options.
const suggestions = computed(() => urlList.value?.filter(x => x.label.toLowerCase().startsWith(value.value.toLowerCase())));
</script>
