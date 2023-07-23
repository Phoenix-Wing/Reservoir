import * as edgedb from "edgedb";
import { createMember, CreateMemberArgs } from "~/queries/createMember.query";

const client = edgedb.createClient();

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateMemberArgs>(event);

    const res = await createMember(client, body);

    return {
        status: "OK",
        res,
    };
});
