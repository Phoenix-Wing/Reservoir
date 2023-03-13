import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.params({ id: e.uuid }, (params) => e.select(e.Country, () => ({
    leader: {
        id: true,
        name: true,
        ig_name: true,
    },

    ...e.Country["*"],

    filter_single: { id: params.id },
})));

export default defineEventHandler(async (event) => {
    const res = await query.run(client, {
        id: event.context.params!.id,
    });

    if (res === null) {
        throw createError({
            statusCode: 400,
            statusMessage: "Country not found",
        });
    }

    return res;
});
