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
    gold_store,
    gold_income,
    material_store,
    material_income,
}
filter .id = <uuid>$id;`;

interface CountryRequest {
    id: string,
    name: string,
    leader?: {
        id: string,
        name: string,
        ig_name?: string,
    },
    gold_store: number,
    gold_income: number,
    material_store: number,
    material_income: number,
}

export default defineEventHandler(async (event) => {
    const res =  await client.querySingle<CountryRequest>(query, {
        id: event.context.params!.id,
    });

    if (res === null) {
        throw createError({
            statusCode: 400,
            statusMessage: "Country not found",
        });
    }

    return res;
});
