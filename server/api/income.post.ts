import * as edgedb from "edgedb";
import { distributeIncome } from "~/queries/distributeIncome.query";

const client = edgedb.createClient();

export default defineEventHandler(async () => {
    const included = await distributeIncome(client);

    return {
        included: included.map(x => x.id),
    };
});
