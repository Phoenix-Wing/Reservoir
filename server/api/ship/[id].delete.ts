import * as edgedb from "edgedb";
import { deleteShip } from "~/queries/ship/deleteShip.query";

const client = edgedb.createClient();

export default defineEventHandler(async (event) => {
    await deleteShip(client, {
        id: event.context.params!.id,
    });

    return {
        status: "OK",
    };
});
