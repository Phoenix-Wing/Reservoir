import * as edgedb from "edgedb";

const client = edgedb.createClient();
const query = `\
select Member {
    id,
    name,
    ig_name,
};`;

interface FactionLeadersRequest {
    id: string,
    name: string,
    ig_name?: string,
}

export default defineEventHandler(async () => {
    return await client.query<FactionLeadersRequest>(query);
});
