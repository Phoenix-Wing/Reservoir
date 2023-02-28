import * as edgedb from "edgedb";
import { MemberQuery } from "~/utils/schema";

const client = edgedb.createClient();
const query = `\
select Member {
    id,
    name,
    ig_name,
    countries,
};`;

export default defineEventHandler(async () => {
    return await client.query<MemberQuery>(query);
});
