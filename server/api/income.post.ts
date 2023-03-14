import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.update(e.Country, country => ({
    // Select only countries whose values would change if income was distributed.
    filter: e.op(
        e.op(country.gold_income, ">", 0),
        "or",
        e.op(country.material_income, ">", 0),
    ),

    set: {
        gold_store: e.op(country.gold_store, "+", country.gold_income),
        material_store: e.op(country.material_store, "+", country.material_income),
    },
}));

interface IncomeParameters {
    // Specify which countries to target.
    target: "all",
}

// List of ids (UUID) included and excluded from distribution.
interface IncomeResponse {
    included: string[],
    excluded: string[],
}

export default defineEventHandler<IncomeResponse>(async (event) => {
    const params = await readBody<IncomeParameters>(event);

    if (params.target == "all") {
        // Extract { id: string[] } to string[].
        const included = await (await query.run(client)).map(x => x.id);

        return {
            included,
            excluded: [],
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
