import * as edgedb from "edgedb";
import e from "~/dbschema/edgeql-js";

const client = edgedb.createClient();
const mutation = e.params(
    {
        name: e.str,
        leader: e.uuid,
    },
    params => e.insert(e.Country, {
        name: params.name,
        leader: e.select(e.Member, _ => ({
            filter_single: { id: params.leader },
        })),
    }),
);

export interface NewCountryArgs {
    name: string,
    leader: string,
}

export default defineEventHandler(async (event) => {
    const body = await readBody<NewCountryArgs>(event);

    const res = await mutation.run(client, body);

    return {
        status: "OK",
        res,
    };
});
