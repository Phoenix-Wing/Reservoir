<template>
    <NResult status="error" :title="title ? title : 'Error'" :description="description">
        <template #footer v-if="details">
            <NButton @click="viewDetails = !viewDetails" type="error" ghost>
                {{ viewDetails ? "Hide error details" : "Show error details" }}
            </NButton>

            <pre v-if="viewDetails"><code>{{ details }}</code></pre>
        </template>
    </NResult>
</template>

<script setup lang="ts">
defineProps<{
    title?: string,
    description?: string,
    details?: any,
}>();

const viewDetails = ref(false);
</script>
