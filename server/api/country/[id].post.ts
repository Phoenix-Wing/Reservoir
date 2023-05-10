import * as edgedb from "edgedb";

const client = edgedb.createClient();

// Don't use query builder, since it is far more unreadable than this
function createMutation(args: UpdateCountryArgs): string {
    let mutations = "";

    if (args.name !== undefined) mutations += "name := <str>$name,\n";
    if (args.leaders !== undefined) mutations +=
        `leaders := (
            select Member filter .id in array_unpack(<array<uuid>>$leaders)
        ),\n`;

    if (args.gold_store !== undefined) mutations += "gold_store := <int64>$gold_store,\n";
    if (args.gold_income !== undefined) mutations += "gold_income := <int32>$gold_income,\n";
    if (args.gold_upkeep !== undefined) mutations += "gold_upkeep := <int32>$gold_upkeep,\n";

    if (args.material_store !== undefined) mutations += "material_store := <int64>$material_store,\n";
    if (args.material_income !== undefined) mutations += "material_income := <int32>$material_income,\n";
    if (args.material_upkeep !== undefined) mutations += "material_upkeep := <int32>$material_upkeep,\n";

    if (args.population !== undefined) mutations += "population := <int32>$population,\n";

    if (args.notes !== undefined) mutations += "notes := <str>$notes,\n";

    return `\
update Country
filter .id = <uuid>$id
set {
    ${mutations}
};`;
}

export interface UpdateCountryArgs {
    name?: string,
    leaders?: string[],

    gold_store?: number,
    gold_income?: number,
    gold_upkeep?: number,

    material_store?: number,
    material_income?: number,
    material_upkeep?: number,

    population?: number,

    notes?: string,
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
