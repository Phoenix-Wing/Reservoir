<template>
    <NCard title="Member">
        <NForm>
            <NFormItem label="Name" required>
                <NInput v-model:value="form.name" clearable />
            </NFormItem>

            <NFormItem label="In-game name">
                <NInput v-model:value="form.ig_name" clearable />
            </NFormItem>

            <NButton @click="async () => await createMember()" :loading="loading">Create</NButton>
        </NForm>
    </NCard>
</template>

<script setup lang="ts">
const message = useMessage();

const form = reactive<{
    name?: string,
    ig_name?: string,
}>({});

const loading = ref(false);

async function createMember() {
    loading.value = true;

    if (!form.name) {
        message.warning("Please ensure that the member's name is not empty!");
        loading.value = false;
        return;
    }

    // Replace empty string with undefined
    if (!form.ig_name) form.ig_name = undefined;

    // Send post request, catching any errors
    try {
        const data = await $fetch("/api/new/member", {
            method: "post",
            body: form,
        });

        await navigateTo(`/member/${data.res.id}`);
    } catch {
        message.error("Error creating member. Please see console for more information.")
    }

    loading.value = false;
}
</script>
