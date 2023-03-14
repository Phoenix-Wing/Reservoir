import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.select(e.Member, () => ({
    id: true,
    name: true,
    ig_name: true,
    countries: {
        id: true,
        name: true,
    },
}));

export default defineEventHandler(async () => {
    return await query.run(client);
});
