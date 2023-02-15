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
}
order by .id
limit 5;`;

interface CountryRequest {
    id: string,
    name: string,
    leader?: {
        id: string,
        name: string,
        irl_name: string,
    },
}

export default defineEventHandler(async () => {
    return await client.query<CountryRequest>(query);
});
