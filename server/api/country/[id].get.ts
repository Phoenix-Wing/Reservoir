import * as edgedb from "edgedb";
import { getCountry } from "~/queries/getCountry.edgeql";

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
