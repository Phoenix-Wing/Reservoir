import * as edgedb from "edgedb";
import { createCountry, CreateCountryArgs } from "~/queries/country/createCountry.query";

const client = edgedb.createClient();

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateCountryArgs>(event);

    const res = await createCountry(client, body);

    return {
        status: "OK",
        res,
    };
});
