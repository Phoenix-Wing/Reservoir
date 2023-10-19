<template>
    <main>
        <NSpin :show="pending" description="Fetching ship data..." size="large">
            <ErrorDisplay v-if="error" description="Error fetching ship data." :details="error" />

            <NEmpty v-else-if="!ship" />

            <template v-else>
                <NPageHeader @back="navigateTo('/')">
                    <template #title>
                        <NText type="primary">{{ ship.kind }}</NText>
                    </template>

                    <template #header>
                        <SmartBreadcrumb :routes="breadcrumbRoute" />
                    </template>

                    <template #extra>
                        <NSpace>
                            <NButton :loading="pending" @click="async () => await refresh()">Refresh</NButton>
                            <NButton @click="editing = true">Edit</NButton>

                            <NPopconfirm @positive-click="deleteShip">
                                <template #trigger>
                                    <NButton type="error" ghost :loading="pendingDeletion">Delete</NButton>
                                </template>

                                Are you sure you want to delete this ship?
                            </NPopconfirm>
                        </NSpace>
                    </template>

                    <template #subtitle>
                        Owned by

                        <NuxtLink v-if="shipOwner" :to="`/country/${shipOwner.id}`" style="color: rgba(255, 255, 255, 0.82); text-decoration: none">{{ shipOwner.name }}</NuxtLink>
                        <template v-else>no one</template>
                    </template>

                    <NCard title="Quick Stats">
                        <NSpace justify="space-around">
                            <NStatistic label="Kind">
                                {{ ship.kind }}
                            </NStatistic>
                            <NStatistic label="Status">
                                {{ ship.status }}
                            </NStatistic>
                            <NStatistic label="Progress">
                                <span v-if="ship.progress">{{ ship.progress.current }} / {{ ship.progress.total }}</span>
                                <span v-else>N/A</span>

                                <template v-if="ship.progress" #suffix>m</template>
                            </NStatistic>
                        </NSpace>
                    </NCard>
                </NPageHeader>

                <LazyEditDrawer v-model:show="editing" title="Editing" @after-leave="editArgs = {}">
                    <NSpace vertical :size="24">
                        <EditCard title="Ship">
                            <NFormItem label="Status" required>
                                <NSelect :options="['Available', 'InUse', 'Busy'].map(x => ({ label: x, value: x }))" :default-value="ship.status" @update:value="x => editArgs.status = x" />
                            </NFormItem>
                        </EditCard>

                        <EditCard v-if="showStatus" title="Progress" inline>
                            <EditFieldNum :default="ship.progress ? ship.progress.current : 0" label="Current" @input:required="x => editArgs.progress_current = x" />
                            <EditFieldNum :default="ship.progress ? ship.progress.total : 1" label="Total" @input:required="x => editArgs.progress_total = x" />
                        </EditCard>
                    </NSpace>

                    <template #footer>
                        <NSpace>
                            <NButton :loading="updateShipPending" type="success" ghost @click="async () => { await updateShip(); editing = false }">Save</NButton>
                            <NButton type="error" ghost @click="editing = false">Discard</NButton>
                        </NSpace>
                    </template>
                </LazyEditDrawer>
            </template>
        </NSpin>
    </main>
</template>

<script setup lang="ts">
import type { UpdateShipArgs } from "~/server/api/ship/[id].post";

const route = useRoute();
const message = useMessage();

const { data: ship, pending, refresh, error } = await useFetch(`/api/ship/${route.params.id}`);

/*
 * VIEWING
 */

const shipOwner = computed(() => ship.value?.boat_owner ? ship.value.boat_owner : ship.value?.airship_owner);

useHead({
    title: () => {
        if (pending.value) {
            return "Fetching ship";
        } else if (error.value) {
            return "Error fetching ship";
        } else {
            return ship.value!.kind;
        }
    },
});

definePageMeta({
    validate: route => validateUuid(route.params.id),
});

const breadcrumbRoute = computed<[string, string][]>(() => [
    ["Reservoir", "/"],
    ["Ship", ""],
    [ship.value ? ship.value.kind : "Loading...", `ship/${route.params.id}`],
]);

const pendingDeletion = ref(false);

async function deleteShip() {
    pendingDeletion.value = true;

    await $fetch(`/api/ship/${route.params.id}`, {
        method: "delete",
    });

    await navigateTo(`/country/${shipOwner.value!.id}`);
    pendingDeletion.value = false;
}

/*
 * EDITING
 */

const editing = ref(false);
const editArgs = ref<UpdateShipArgs>({});
const updateShipPending = ref(false);

const showStatus = computed(() => {
    return editArgs.value.status !== undefined
        ? editArgs.value.status === "InUse"
        : ship.value != null && ship.value.status === "InUse";
});

watch(showStatus, (value, _oldValue) => {
    if (value) {
        delete editArgs.value.progress;
        editArgs.value.progress_current = 0;
        editArgs.value.progress_total = 1;
    } else {
        editArgs.value.progress = null;
        delete editArgs.value.progress_current;
        delete editArgs.value.progress_total;
    }
});

async function updateShip() {
    updateShipPending.value = true;

    try {
        await $fetch(`/api/ship/${route.params.id}`, {
            method: "post",
            body: editArgs.value,
        });
    } catch {
        message.error("There was an error updating ship information. Please check the console for more information.");
    }

    await refresh();

    updateShipPending.value = false;
}
</script>
