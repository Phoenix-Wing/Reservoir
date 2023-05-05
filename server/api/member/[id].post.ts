import * as edgedb from "edgedb";

const client = edgedb.createClient();

function createMutation(args: UpdateMemberArgs): string {
    let mutations = "";

    if (args.name != null) mutations += `name := "${args.name}",\n`;
    if (args.ig_name != null) mutations += `ig_name := "${args.ig_name}",\n`;

    return `\
update Member
filter .id = <uuid>$id
set {
    ${mutations}
};`;
}

export interface UpdateMemberArgs {
    name?: string | null,
    ig_name?: string | null,
}

export default defineEventHandler(async (event) => {
    const body = await readBody<UpdateMemberArgs>(event);

    const mutation = createMutation(body);

    await client.execute(mutation, {
        id: event.context.params!.id,
    });

    return {
        status: "OK",
    };
});
