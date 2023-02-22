import * as edgedb from "edgedb";
import { CountryMutation, verifyCountryMutation } from "~/utils/mutations";

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

export default defineEventHandler(async (event) => {
    const body = await readBody<CountryMutation>(event);

    const verified = verifyCountryMutation(body);

    if (verified != null) {
        throw createError({
            statusCode: 400,
            statusMessage: `Malformed '${verified.property}'${verified.reason ? " because '" + verified.reason + "'" : ""}.`,
            data: verified,
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
