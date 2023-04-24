import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const PAGE_SIZE = 5;

const client = edgedb.createClient();
const query = e.params({ page: e.int64 }, (params) => e.select({
    pages: e.math.ceil(e.op(e.count(e.select(e.Member)), "/", PAGE_SIZE)),
    members: e.select(e.Member, member => ({
        id: true,
        name: true,
        ig_name: true,
        countries: true,

        order_by: member.name,
        limit: PAGE_SIZE,
        offset: e.op(params.page, "*", PAGE_SIZE),
    })),
}));

export default defineEventHandler(async (event) => {
    const args = getQuery(event);

    let page = 0;

    if (typeof args.page == "string") {
        page = parseInt(args.page);
    } else if (typeof args.page == "number") {
        page = args.page;
    }

    return await query.run(client, {
        page,
    });
});
