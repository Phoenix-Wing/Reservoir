<template>
    <NButton v-if="!confirm" @click="confirm = true">
        Progress ships
    </NButton>
    <NCard v-else title="Are you sure?" embedded>
        <NButtonGroup vertical>
            <NButton type="success" ghost :loading="pending" @click="progressShips">Yes, progress ships</NButton>
            <NButton type="error" ghost @click="confirm = false; pending = false">No, don't do it</NButton>
        </NButtonGroup>
    </NCard>
</template>

<script setup lang="ts">
const message = useMessage();

const confirm = ref(false);
const pending = ref(false);

async function progressShips() {
    pending.value = true;

    const { error } = await useFetch("/api/progress-ships", {
        method: "post",
    });

    // If an error was returned from API endpoint.
    if (error.value) {
        message.error("An error occured while progressing ships. (Please see console for more information.)", {
            keepAliveOnHover: true,
            duration: 5000,
            closable: true,
        });
    } else {
        message.success("Successfully progressed ships.");
    }

    confirm.value = false;
    pending.value = false;
}
</script>
