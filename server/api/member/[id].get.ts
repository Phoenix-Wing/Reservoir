import * as edgedb from "edgedb";
import { getMember } from "~/queries/getMember.edgeql";

const client = edgedb.createClient();

export default defineEventHandler(async (event) => {
    const res = await getMember(client, {
        id: event.context.params!.id,
    });

    if (res == null) {
        throw createError({
            statusCode: 400,
            statusMessage: "Member not found",
        });
    }

    return res;
});
