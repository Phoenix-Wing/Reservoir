import * as edgedb from "edgedb";
import { getCountries } from "~/queries/getCountries.query";

const client = edgedb.createClient();

export default defineEventHandler(async (event) => {
    const args = getQuery(event);

    let offset = null;
    let limit = null;

    if (typeof args.offset === "string") {
        offset = parseInt(args.offset);
    }

    if (typeof args.limit === "string") {
        limit = parseInt(args.limit);
    }

    return await getCountries(client, {
        offset,
        limit,
    });
});
