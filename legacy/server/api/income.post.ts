import * as edgedb from "edgedb";

const client = edgedb.createClient();
const queryAll = queryWith(null);

interface IncomeConfirmation {
    target: "all" | { exclude: string[] } | { include: string[] },
}

function queryWith(modifiers: string | null): string {
    return `\
update Country
filter .gold_income > 0 or .material_income > 0
${modifiers ? "and " + modifiers : ""}
set {
  gold_store := .gold_store + .gold_income,
  material_store := .material_store + .material_income,
};`;
}

export default defineEventHandler(async (event) => {
    const confirmation = await readBody<IncomeConfirmation>(event);

    if (confirmation.target === "all") {
        await client.execute(queryAll);
    } else if ("exclude" in confirmation.target) {
        throw createError({
            statusCode: 400,
            statusMessage: "Malformed 'target' property. 'target.exclude' is not yet supported.",
        });
    } else if ("include" in confirmation.target) {
        throw createError({
            statusCode: 400,
            statusMessage: "Malformed 'target' property. 'target.exclude' is not yet supported.",
        });
    } else {
        throw createError({
            statusCode: 400,
            statusMessage: "Malformed 'target' property. Please report this error with the given data!",
            data: confirmation.target,
        });
    }

    return {
        status: "Ok",
    };
});
