<template>
    <NButton v-if="!confirmIncome" @click="confirmIncome = true">
        Distribute income
    </NButton>
    <NCard v-else title="Are you sure?" embedded>
        <NButtonGroup vertical>
            <NButton type="success" ghost :loading="pendingDistribution" @click="async () => distributeIncome()">Yes, distribute income</NButton>
            <NButton type="error" ghost @click="confirmIncome = false; pendingDistribution = false">No, don't do it</NButton>
        </NButtonGroup>
    </NCard>
</template>

<script setup lang="ts">
const message = useMessage();

const confirmIncome = ref(false);
const pendingDistribution = ref(false);

async function distributeIncome() {
    pendingDistribution.value = true;

    const { data, error } = await useFetch("/api/income", {
        method: "post",
        // Distribute to all countries.
        body: { target: "all" },
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

    confirmIncome.value = false;
    pendingDistribution.value = false;
}
</script>
