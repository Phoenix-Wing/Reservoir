import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const mutation = e.params(
    {
        name: e.str,
        ig_name: e.optional(e.str),
    },
    params => e.insert(e.Member, {
        name: params.name,
        ig_name: params.ig_name,
    }),
);

interface NewMemberArgs {
    name: string,
    ig_name?: string | null,
}

export default defineEventHandler(async (event) => {
    const body = await readBody<NewMemberArgs>(event);

    const res = await mutation.run(client, body);

    return {
        status: "OK",
        res,
    };
});
