<template>
    <!--
        Iterate over the index, ignoring the value
        See: https://vuejs.org/api/built-in-directives.html#v-for
    -->
    <template v-for="(_, i) in leaders">
        <!-- Output name, concated with a comma if not the last item -->
        {{ leaders[i].name }}{{ i < leaders.length - 1 ? ", " : "" }}
    </template>
</template>

<script setup lang="ts">
defineProps<{
    leaders: {
        id: string,
        name: string,
    }[],
}>();
</script>
