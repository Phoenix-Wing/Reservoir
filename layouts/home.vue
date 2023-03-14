<template>
    <NLayout style="padding: 6rem 10rem">
        <NSpace justify="center" style="padding: 1rem 0">
            <NH1>
                <NuxtLink to="/" style="text-decoration: none">
                    <NText type="primary">
                        Reservoir
                    </NText>
                </NuxtLink>
            </NH1>
        </NSpace>

        <slot />
    </NLayout>
</template>
