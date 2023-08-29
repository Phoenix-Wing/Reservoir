import * as edgedb from "edgedb";

const client = edgedb.createClient();

export interface UpdateCountryArgs {
    name?: string,
    leaders?: string[],

    notes?: string,
}

// Don't use query builder, since it is far more unreadable than this
function createMutation(args: UpdateCountryArgs): string {
    let mutations = "";

    if (args.name !== undefined) { mutations += "name := <str>$name,\n"; }
    if (args.leaders !== undefined) {
        mutations +=
        `leaders := (
            select Member filter .id in array_unpack(<array<uuid>>$leaders)
        ),\n`;
    }

    if (args.notes !== undefined) { mutations += "notes := <str>$notes,\n"; }

    return `\
update Country
filter .id = <uuid>$id
set {
    ${mutations}
};`;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<UpdateCountryArgs>(event);

    const mutation = createMutation(body);

    await client.execute(mutation, {
        id: event.context.params!.id,
        ...body,
    });

    return {
        status: "OK",
    };
});
