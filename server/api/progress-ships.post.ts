import * as edgedb from "edgedb";
import { progressShips } from "~/queries/progressShips.query";

const client = edgedb.createClient();

export default defineEventHandler(async () => {
    await progressShips(client);

    return {
        status: "OK",
    };
});
