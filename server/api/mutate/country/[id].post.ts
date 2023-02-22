import * as edgedb from "edgedb";

const client = edgedb.createClient();

function createMutation(params: CountryMutation): string {
    let res = ``;

    if (params.gold_income != null) {
        res += `gold_income := ${params.gold_income},\n`;
    }

    if (params.gold_store != null) {
        res += `gold_store := ${params.gold_store},\n`;
    }

    return res;
}

export interface CountryMutation {
    gold_income: number | null,
    gold_store: number | null,
}

export default defineEventHandler(async (event) => {
    const body = await readBody<CountryMutation>(event);
    const mutation = createMutation(body);

    await client.execute(`\
update Country
filter .id = <uuid>$id
set {
    ${mutation}
};`, {
        id: event.context.params!.id,
    });
});
