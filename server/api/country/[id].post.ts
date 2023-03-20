import * as edgedb from "edgedb";

const client = edgedb.createClient();

// Don't use query builder, since it is far more unreadable than this
function createMutation(args: UpdateCountryArgs): string {
    let mutations = "";

    if (args.gold_store != null) mutations += `gold_store := ${args.gold_store},\n`;
    if (args.gold_income != null) mutations += `gold_income := ${args.gold_income},\n`;

    return `\
update Country
filter .id = <uuid>$id
set {
    ${mutations}
}`;
}

export interface UpdateCountryArgs {
    gold_store?: number | null,
    gold_income?: number | null,
}

export default defineEventHandler(async (event) => {
    const body = await readBody<UpdateCountryArgs>(event);

    const mutation = createMutation(body);

    await client.execute(mutation, {
        id: event.context.params!.id,
    });

    return {
        status: "OK",
    };
});
