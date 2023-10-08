import * as edgedb from "edgedb";

const client = edgedb.createClient();

export interface UpdateShipArgs {
    status?: "Available" | "Busy" | "InRepair" | "Damaged" | "Destroyed",
    progress?: null,
    progress_current?: number,
    progress_total?: number,
}

function createMutation(args: UpdateShipArgs): string {
    let mutations = "";

    if (args.status !== undefined) { mutations += "status := <ShipStatus><str>$status,\n"; }

    const progress = [args.progress_current !== undefined, args.progress_total !== undefined];

    switch (true) {
        // If progress explicitly removed
        case args.progress === null:
            // Unset property
            delete args.progress;
            mutations += "progress := {},\n";
            break;

        // Both true
        case progress[0] && progress[1]:
            mutations += `\
progress := (
    current := <int32>$progress_current,
    total := <int32>$progress_total,
),\n`;
            break;

        // Only current
        case progress[0] && !progress[1]:
            mutations += `\
progress := (
    current := <int32>$progress_current,
    total := Ship.progress.total,
),\n`;
            break;

        // Only total
        case !progress[0] && progress[1]:
            mutations += `\
progress := (
    current := Ship.progress.current,
    total := <int32>$progress_total,
),\n`;
            break;

        // Both false
        case !progress[0] && !progress[1]:
            // Do nothing
            break;
    }

    return `\
with module ship
update Ship
filter .id = <uuid>$id
set {
    ${mutations}
};`;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<UpdateShipArgs>(event);

    const mutation = createMutation(body);

    await client.execute(mutation, {
        id: event.context.params!.id,
        ...body,
    });

    return {
        status: "OK",
    };
});
