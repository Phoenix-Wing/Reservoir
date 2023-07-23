<template>
    <NCard title="Country">
        <NForm>
            <NFormItem label="Name" required>
                <NInput v-model:value="form.name" clearable />
            </NFormItem>

            <NFormItem label="Leader" required>
                <NSelect v-model:value="form.leader" :options="membersOptions" :loading="pending" filterable>
                    <template v-if="error" #action>
                        <NAlert title="Error fetching members" type="error">
                            <code>{{ error }}</code>
                        </NAlert>
                    </template>
                </NSelect>
            </NFormItem>

            <NButton @click="async () => await createCountry()" :loading="loading">Create</NButton>
        </NForm>
    </NCard>
</template>

<script setup lang="ts">
const message = useMessage();

const { data, pending, refresh, error } = await useLazyFetch("/api/members", {
    pick: ["members"],
});

// Export refresh function to be accessible from template refs
defineExpose({
    refresh,
});

const form = reactive<{
    name?: string,
    leader?: string,
}>({});

const loading = ref(false);

const membersOptions = computed(() => data.value ? data.value.members.map(x => ({
    label: x.name,
    value: x.id,
})) : []);

async function createCountry() {
    loading.value = true;

    if (!form.leader || !form.name) {
        message.warning("Please ensure that the country's name and leader are not empty!");
        loading.value = false;
        return;
    }

    try {
        const data = await $fetch("/api/new/country", {
            method: "post",
            body: form,
            pick: ["res"],
        });

        await navigateTo(`/country/${data.res.id}`);
    } catch {
        message.error("Error creating country. Please see console for more information.");
    }

    loading.value = false;
}
</script>
