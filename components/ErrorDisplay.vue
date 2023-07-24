<template>
    <NResult status="error" :title="title ? title : 'Error'" :description="description">
        <template v-if="details" #footer>
            <NButton type="error" ghost @click="viewDetails = !viewDetails">
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
