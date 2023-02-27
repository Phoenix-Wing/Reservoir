import * as edgedb from "edgedb";

const client = edgedb.createClient();
const query = `\
update Country
filter .gold_income > 0 or .material_income > 0
set {
  gold_store := .gold_store + .gold_income,
  material_store := .material_store + .material_income,
};`;

interface IncomeConfirmation {
    confirm: boolean,
}

export default defineEventHandler(async (event) => {
    const confirmation = await readBody<IncomeConfirmation>(event);

    if (!confirmation.confirm) {
        throw createError({
            statusCode: 400,
            statusMessage: "Malformed request. Please set 'confirm' to true to distribute the income.",
        });
    }

    await client.execute(query);

    return {
        status: "Ok",
    };
});
