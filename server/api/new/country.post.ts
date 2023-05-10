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
        // Only support setting one member at creation for now
        leaders: e.select(e.Member, _ => ({
            filter_single: { id: params.leader },
        })),
    }),
);

interface NewCountryArgs {
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
