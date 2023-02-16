import * as edgedb from "edgedb";

const client = edgedb.createClient();
const query = `\
select Country {
    id,
    name,
    leader: {
        id,
        name,
        ig_name,
    },
}
order by .id
limit 5;`;

interface CountriesRequest {
    id: string,
    name: string,
    leader?: {
        id: string,
        name: string,
        ig_name?: string,
    },
}

export default defineEventHandler(async () => {
    return await client.query<CountriesRequest>(query);
});
