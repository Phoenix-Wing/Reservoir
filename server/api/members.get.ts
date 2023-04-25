import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.params(
    {
        offset: e.optional(e.int64),
        limit: e.optional(e.int64),
    },
    (params) => e.select({
        total: e.count(e.select(e.Member)),
        members: e.select(e.Member, member => ({
            id: true,
            name: true,
            ig_name: true,
            countries: true,

            order_by: member.name,
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
