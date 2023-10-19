<template>
    <NPopover v-if="!confirm">
        <template #trigger>
            <NButton @click="confirm = true">
                Distribute income
            </NButton>
        </template>

        <span>This will add a countries profit to its quantity, but it will also feed the country.</span>
    </NPopover>

    <NCard v-else title="Are you sure?" embedded>
        <NButtonGroup vertical>
            <NButton type="success" ghost :loading="pending" @click="distributeIncome">Yes, distribute income</NButton>
            <NButton type="error" ghost @click="confirm = false; pending = false">No, don't do it</NButton>
        </NButtonGroup>
    </NCard>
</template>

<script setup lang="ts">
const message = useMessage();

const confirm = ref(false);
const pending = ref(false);

async function distributeIncome() {
    pending.value = true;

    const { data, error } = await useFetch("/api/income", {
        method: "post",
    });

    // If an error was returned from API endpoint.
    if (error.value) {
        message.error("An error occured while distributing income. (Please see console for more information.)", {
            keepAliveOnHover: true,
            duration: 5000,
            closable: true,
        });
    } else {
        message.success(`Distributed income to ${data.value!.included.length} material groups.`);
    }

    confirm.value = false;
    pending.value = false;
}
</script>
