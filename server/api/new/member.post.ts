import * as edgedb from "edgedb";
import { createMember } from "~/queries/createMember.edgeql";

const client = edgedb.createClient();

interface NewMemberArgs {
    name: string,
    ig_name?: string | null,
}

export default defineEventHandler(async (event) => {
    const body = await readBody<NewMemberArgs>(event);

    const res = await createMember(client, body);

    return {
        status: "OK",
        res,
    };
});
