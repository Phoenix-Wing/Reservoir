import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.params({ id: e.uuid }, (params) => e.select(e.Member, member => ({
    id: true,
    name: true,
    ig_name: true,

    sum_gold: e.sum(member.countries.gold_store),
    sum_materials: e.sum(member.countries.material_store),

    countries: {
        id: true,
        name: true,
        gold_store: true,
        material_store: true,
    },

    filter_single: { id: params.id },
})));

export default defineEventHandler(async (event) => {
    const res = await query.run(client, {
        id: event.context.params!.id,
    });

    if (res == null) {
        throw createError({
            statusCode: 400,
            statusMessage: "Member not found",
        });
    }

    return res;
});