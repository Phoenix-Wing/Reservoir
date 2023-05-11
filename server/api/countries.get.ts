import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.params(
    {
        offset: e.optional(e.int64),
        limit: e.optional(e.int64),
    },
    (params) => e.select({
        total: e.count(e.select(e.Country)),
        countries: e.select(e.Country, country => ({
            id: true,
            name: true,
            leaders: {
                id: true,
                name: true,
                ig_name: true,
            },
        
            order_by: country.name,
            offset: params.offset,
            limit: params.limit,
        })),
    }),
);

export default defineEventHandler(async (event) => {
    const args = getQuery(event);

    let offset = null;
    let limit = null;

    if (typeof args.offset == "string") {
        offset = parseInt(args.offset);
    }

    if (typeof args.limit == "string") {
        limit = parseInt(args.limit);
    }

    return await query.run(client, {
        offset,
        limit,
    });
});
