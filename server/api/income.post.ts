import * as edgedb from "edgedb";

const client = edgedb.createClient();
const query = `\
update Country
filter .gold_profit != 0 or .material_profit != 0
set {
  gold_store := max({.gold_store + .gold_profit, 0}),
  material_store := max({.material_store + .material_profit, 0}),
};`;

interface IncomeParameters {
    // Specify which countries to target.
    target: "all",
}

// List of ids (UUID) included and excluded from distribution.
interface IncomeResponse {
    included: string[],
}

export default defineEventHandler<IncomeResponse>(async (event) => {
    const params = await readBody<IncomeParameters>(event);

    if (params.target == "all") {
        const included: { id: string }[] = await client.query(query);

        return {
            // Extract { id: string[] } to string[].
            included: await included.map(x => x.id),
        };
    } else {
        const errorData = { target: params.target };

        console.error("Malformed 'target' property.", errorData);

        throw createError({
            statusCode: 400,
            statusMessage: "Malformed 'target' property.",
            data: errorData,
        });
    }
});
