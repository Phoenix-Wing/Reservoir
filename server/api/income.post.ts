import * as edgedb from "edgedb";
import { distributeIncome } from "~/queries/distributeIncome.query";

const client = edgedb.createClient();

interface IncomeParameters {
    // Specify which countries to target.
    target: "all",
}

export default defineEventHandler(async (event) => {
    const params = await readBody<IncomeParameters>(event);

    if (params.target === "all") {
        const included = await distributeIncome(client);

        return {
            included: included.map(x => x.id),
        };
    } else {
        const errorData = { target: params.target };

        throw createError({
            statusCode: 400,
            statusMessage: "Malformed 'target' property.",
            data: errorData,
        });
    }
});
