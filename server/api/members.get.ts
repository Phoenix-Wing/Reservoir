import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.select(e.Member, member => ({
    id: true,
    name: true,
    countries: {
        id: true,
        name: true,
    },

    order_by: member.name,
}));

export default defineEventHandler(async () => {
    return await query.run(client);
});
