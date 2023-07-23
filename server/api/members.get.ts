import * as edgedb from "edgedb";
import { getMembers } from "~/queries/getMembers.edgeql";

const client = edgedb.createClient();

export default defineEventHandler(async (event) => {
    const args = getQuery(event);

    let offset = null;
    let limit = null;

    if (typeof args.offset == "string") {
        offset = parseInt(args.offset);
    }

    if (typeof args.limit == "string") {
        limit = parseInt(args.limit);
    }

    return await getMembers(client, {
        offset,
        limit,
    });
});
