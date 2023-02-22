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

    if (params.material_income != null) {
        res += `material_income := ${params.material_income},\n`;
    }

    if (params.material_store != null) {
        res += `material_store := ${params.material_store},\n`;
    }

    return res;
}

export interface CountryMutation {
    gold_income: number | null,
    gold_store: number | null,
    material_income: number | null,
    material_store: number | null,
}

export default defineEventHandler(async (event) => {
    const body = await readBody<CountryMutation>(event);

    if (body.gold_store != null && body.gold_store < 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "'gold_store' must be >= 0.",
        });
    }

    if (body.material_store != null && body.material_store < 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "'material_store' must be >= 0.",
        });
    }

    const mutation = createMutation(body);

    await client.execute(`\
update Country
filter .id = <uuid>$id
set {
    ${mutation}
};`, {
        id: event.context.params!.id,
    });

    return {
        status: "Ok",
    };
});
