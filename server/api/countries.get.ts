import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.select(e.Country, country => ({
    id: true,
    name: true,
    leaders: {
        id: true,
        name: true,
        ig_name: true,
    },

    order_by: country.name,
}));

export default defineEventHandler(async () => {
    return await query.run(client);
});
