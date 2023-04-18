import * as edgedb from "edgedb";

const client = edgedb.createClient();

// Don't use query builder, since it is far more unreadable than this
function createMutation(args: UpdateCountryArgs): string {
    let mutations = "";

    if (args.gold_store != null) mutations += `gold_store := ${args.gold_store},\n`;
    if (args.gold_income != null) mutations += `gold_income := ${args.gold_income},\n`;
    if (args.gold_upkeep != null) mutations += `gold_upkeep := ${args.gold_upkeep},\n`;

    if (args.material_store != null) mutations += `material_store := ${args.material_store},\n`;
    if (args.material_income != null) mutations += `material_income := ${args.material_income},\n`;
    if (args.material_upkeep != null) mutations += `material_upkeep := ${args.material_upkeep},\n`;

    if (args.population != null) mutations += `population := ${args.population},\n`;

    if (args.notes != null) mutations += `notes := "${args.notes}",\n`;

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
    gold_upkeep?: number | null,

    material_store?: number | null,
    material_income?: number | null,
    material_upkeep?: number | null,

    population?: number | null,

    notes?: string | null,
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
