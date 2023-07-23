import * as edgedb from "edgedb";
import { createCountry } from "~/queries/createCountry.query";

const client = edgedb.createClient();

interface NewCountryArgs {
    name: string,
    leader: string,
}

export default defineEventHandler(async (event) => {
    const body = await readBody<NewCountryArgs>(event);

    const res = await createCountry(client, body);

    return {
        status: "OK",
        res,
    };
});
