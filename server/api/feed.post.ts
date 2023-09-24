import * as edgedb from "edgedb";
import { feedCountry } from "~/queries/feedCountry.query";

const client = edgedb.createClient();

export default defineEventHandler(async () => {
    const included = await feedCountry(client);

    return {
        included: included.map(x => x.id),
    };
});
