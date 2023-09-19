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

            <NFormItem label="Size" required>
                <NRadioGroup v-model:value="form.size">
                    <NSpace>
                        <NRadio value="Small" label="Small" />
                        <NRadio value="Medium" label="Medium" />
                        <NRadio value="Large" label="Large" />
                    </NSpace>
                </NRadioGroup>
            </NFormItem>

            <NButton :loading="loading" @click="async () => await createCountry()">Create</NButton>
        </NForm>
    </NCard>
</template>

<script setup lang="ts">
const message = useMessage();

const { data, pending, refresh, error } = await useLazyFetch("/api/members", {
    pick: ["members"],
});

// Export refresh function to be accessible from template refs
// eslint-disable-next-line vue/no-expose-after-await
defineExpose({
    refresh,
});

const form = reactive<{
    name?: string,
    leader?: string,
    size?: string,
}>({});

const loading = ref(false);

const membersOptions = computed(() => data.value
    ? data.value.members.map(x => ({
        label: x.name,
        value: x.id,
    }))
    : []);

async function createCountry() {
    loading.value = true;

    if (!form.leader || !form.name || !form.size) {
        message.warning("Please ensure that none of the required fields are empty!");
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
