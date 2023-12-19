import * as edgedb from "edgedb";
import { getCountry } from "~/queries/country/getCountry.query";

const client = edgedb.createClient();

export default defineEventHandler(async (event) => {
    const res = await getCountry(client, {
        id: event.context.params!.id,
    });

    if (res == null) {
        throw createError({
            statusCode: 400,
            statusMessage: "Country not found",
        });
    }

    return res;
});
