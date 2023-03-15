import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.params({ id: e.uuid }, (params) => e.select(e.Country, () => ({
    id: true,
    name: true,

    leader: {
        name: true,
        ig_name: true,
    },

    gold_store: true,
    gold_income: true,
    material_store: true,
    material_income: true,
    population: true,

    filter_single: { id: params.id },
})));

export default defineEventHandler(async (event) => {
    const res = await query.run(client, {
        id: event.context.params!.id,
    });

    if (res == null) {
        throw createError({
            statusCode: 400,
            statusMessage: "Country not found",
        });
    }

    return res;
});
