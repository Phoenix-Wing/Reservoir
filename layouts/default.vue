<template>
    <NLayout class="page">
        <slot />
    </NLayout>
</template>

<style scoped>
@media (max-width: 640px) {
    .page {
        padding: 6rem 1rem;
    }
}

@media (min-width: 640px) {
    .page {
        padding: 6rem 10rem;
    }
}
</style>
