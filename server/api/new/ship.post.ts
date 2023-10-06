import * as edgedb from "edgedb";
import { createBoat } from "~/queries/createBoat.query";
import { createAirship } from "~/queries/createAirship.query";

const client = edgedb.createClient();

export interface CreateShipArgs {
    owner: string,
    kind: "Boat" | "Airship",
}

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateShipArgs>(event);

    if (body.kind === "Boat") {
        await createBoat(client, {
            owner: body.owner,
        });
    } else if (body.kind === "Airship") {
        await createAirship(client, {
            owner: body.owner,
        });
    } else {
        throw createError({
            statusCode: 400,
            statusMessage: "Ship kind not 'Boat' nor 'Airship.'",
        });
    }

    return {
        status: "OK",
    };
});
