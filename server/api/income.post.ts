import * as edgedb from "edgedb";
import { distributeIncome } from "~/queries/distributeIncome.query";

const client = edgedb.createClient();

interface IncomeParameters {
    // Specify which countries to target.
    target: "all",
}

// List of ids (UUID) included and excluded from distribution.
interface IncomeResponse {
    included: string[],
}

export default defineEventHandler<IncomeResponse>(async (event) => {
    const params = await readBody<IncomeParameters>(event);

    if (params.target == "all") {
        const included = await distributeIncome(client);

        return {
            included: included.map(x => x.id),
        };
    } else {
        const errorData = { target: params.target };

        console.error("Malformed 'target' property.", errorData);

        throw createError({
            statusCode: 400,
            statusMessage: "Malformed 'target' property.",
            data: errorData,
        });
    }
});
