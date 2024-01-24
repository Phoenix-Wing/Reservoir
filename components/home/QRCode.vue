<template>
    <NButton @click="showModal = true">View QR Code</NButton>

    <NModal v-model:show="showModal">
        <NCard title="QR Code" style="width: 300px" closable @close="showModal = false">
            <NSpace justify="center">
                <NQrCode :value="url.toString()" :size="150" />
            </NSpace>
            <p>
                <NText depth="2">Scan this to view Reservoir on mobile.</NText>
            </p>
        </NCard>
    </NModal>
</template>

<script setup lang="ts">
const showModal = ref(false);
const url = useRequestURL();
</script>
