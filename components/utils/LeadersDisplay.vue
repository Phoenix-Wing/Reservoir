<template>
    <span v-if="leaders.length != 0">
        Lead by

        <!--
            Iterate over the index, ignoring the value
            See: https://vuejs.org/api/built-in-directives.html#v-for
        -->
        <template v-for="(_, i) in leaders">
            <!-- Output name, concated with a comma if not the last item -->
            <NuxtLink :to="`/member/${leaders[i].id}`" :style="style">
                {{ leaders[i].name }}
            </NuxtLink>{{ i < leaders.length - 1 ? ", " : "" }}
        </template>
    </span>

    <span v-else>
        No current leaders
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    leaders: {
        id: string,
        name: string,
    }[],
    color?: string,
}>();

// Set color, remove default underline, and make italic
const style = computed(() => `\
color: ${props.color ? props.color : "rgba(255, 255, 255, 0.82)"}; \
text-decoration: none
`);
</script>
