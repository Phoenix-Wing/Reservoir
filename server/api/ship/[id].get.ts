import * as edgedb from "edgedb";
import { getShip } from "~/queries/getShip.query";

const client = edgedb.createClient();

export default defineEventHandler(async (event) => {
    const res = await getShip(client, {
        id: event.context.params!.id,
    });

    if (res == null) {
        throw createError({
            statusCode: 400,
            statusMessage: "Ship not found",
        });
    }

    return res;
});
