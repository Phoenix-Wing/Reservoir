import * as edgedb from "edgedb";

const client = edgedb.createClient();
const query = `\
select Country {
    id,
    name,
    leader: {
        id,
        name,
        irl_name,
    },
}`;

export default defineEventHandler(async () => {
    return await client.query(query);
});
