import * as edgedb from "edgedb";
import { getQuickStats } from "~/queries/getQuickStats.query";

const client = edgedb.createClient();

export default defineEventHandler(async () => await getQuickStats(client));
