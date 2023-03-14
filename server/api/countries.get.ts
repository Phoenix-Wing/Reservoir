import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const query = e.select(e.Country, () => ({
    id: true,
    name: true,
    leader: {
        name: true,
        ig_name: true,
    },
}));

export default defineEventHandler(async () => {
    return await query.run(client);
});
