import * as edgedb from "edgedb";

const client = edgedb.createClient();

function createMutation(args: UpdateMemberArgs): string {
    let mutations = "";

    if (args.name !== undefined) mutations += "name := <str>$name,\n";
    if (args.ig_name !== undefined) mutations += "ig_name := <optional str>$ig_name,\n";

    return `\
update Member
filter .id = <uuid>$id
set {
    ${mutations}
};`;
}

export interface UpdateMemberArgs {
    name?: string,
    ig_name?: string | null,
}

export default defineEventHandler(async (event) => {
    const body = await readBody<UpdateMemberArgs>(event);

    const mutation = createMutation(body);

    await client.execute(mutation, {
        id: event.context.params!.id,
        ...body,
    });

    return {
        status: "OK",
    };
});
