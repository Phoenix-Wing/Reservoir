<template>
    <NuxtLink class="n-link">
        <slot />
    </NuxtLink>
</template>

<style scoped>
.n-link {
    color: v-bind("useThemeVars().value.primaryColor");
}
</style>
