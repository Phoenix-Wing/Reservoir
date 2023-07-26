import * as edgedb from "edgedb";
import { getSearchBar, GetSearchBarReturns } from "~/queries/getSearchBar.query";

const client = edgedb.createClient();

// Replace `kind`s string type with union type.
type SearchResponse = Omit<GetSearchBarReturns, "kind"> & {
    kind: "Country" | "Member",
};

export default defineCachedEventHandler(
    async () => await getSearchBar(client) as SearchResponse,
    {
        // Cache for 60 seconds
        maxAge: 60,
        // stale-while-revalidate: use stale cache even while validating it
        swr: true,
    },
);
