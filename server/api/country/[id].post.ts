import * as edgedb from "edgedb";

const client = edgedb.createClient();

export interface UpdateCountryArgs {
    name?: string,
    leaders?: string[],

    size?: "Small" | "Medium" | "Large",

    consumes_foodstuffs?: boolean,
    notes?: string,

    // TODO(BD103): Nest these fields
    gold_quantity?: number,
    gold_income?: number,
    gold_upkeep?: number,

    foodstuffs_quantity?: number,
    foodstuffs_income?: number,
    foodstuffs_upkeep?: number,

    construction_quantity?: number,
    construction_income?: number,
    construction_upkeep?: number,

    luxuries_quantity?: number,
    luxuries_income?: number,
    luxuries_upkeep?: number,

    catalyst_quantity?: number,
    catalyst_income?: number,
    catalyst_upkeep?: number,

    gonslate_quantity?: number,
    gonslate_income?: number,
    gonslate_upkeep?: number,
}

// Don't use query builder, since it is far more unreadable than this
function createMutation(args: UpdateCountryArgs): string {
    let countryProps = "";

    if (args.name !== undefined) { countryProps += "name := <str>$name,\n"; }
    if (args.leaders !== undefined) {
        countryProps +=
        `leaders := (
            select Member filter .id in array_unpack(<array<uuid>>$leaders)
        ),\n`;
    }

    if (args.size !== undefined) { countryProps += "size := <CountrySize><str>$size,\n"; }

    if (args.consumes_foodstuffs !== undefined) { countryProps += "consumes_foodstuffs := <bool>$consumes_foodstuffs,\n"; }
    if (args.notes !== undefined) { countryProps += "notes := <str>$notes,\n"; }

    let goldProps = "";

    if (args.gold_quantity !== undefined) { goldProps += "quantity := <int64>$gold_quantity,\n"; }
    if (args.gold_income !== undefined) { goldProps += "income := <int32>$gold_income,\n"; }
    if (args.gold_upkeep !== undefined) { goldProps += "upkeep := <int32>$gold_upkeep,\n"; }

    let foodstuffsProps = "";

    if (args.foodstuffs_quantity !== undefined) { foodstuffsProps += "quantity := <int64>$foodstuffs_quantity,\n"; }
    if (args.foodstuffs_income !== undefined) { foodstuffsProps += "income := <int32>$foodstuffs_income,\n"; }
    if (args.foodstuffs_upkeep !== undefined) { foodstuffsProps += "upkeep := <int32>$foodstuffs_upkeep,\n"; }

    let constructionProps = "";

    if (args.construction_quantity !== undefined) { constructionProps += "quantity := <int64>$construction_quantity,\n"; }
    if (args.construction_income !== undefined) { constructionProps += "income := <int32>$construction_income,\n"; }
    if (args.construction_upkeep !== undefined) { constructionProps += "upkeep := <int32>$construction_upkeep,\n"; }

    let luxuriesProps = "";

    if (args.luxuries_quantity !== undefined) { luxuriesProps += "quantity := <int64>$luxuries_quantity,\n"; }
    if (args.luxuries_income !== undefined) { luxuriesProps += "income := <int32>$luxuries_income,\n"; }
    if (args.luxuries_upkeep !== undefined) { luxuriesProps += "upkeep := <int32>$luxuries_upkeep,\n"; }

    let catalystProps = "";

    if (args.catalyst_quantity !== undefined) { catalystProps += "quantity := <int64>$catalyst_quantity,\n"; }
    if (args.catalyst_income !== undefined) { catalystProps += "income := <int32>$catalyst_income,\n"; }
    if (args.catalyst_upkeep !== undefined) { catalystProps += "upkeep := <int32>$catalyst_upkeep,\n"; }

    let gonslateProps = "";

    if (args.gonslate_quantity !== undefined) { gonslateProps += "quantity := <int64>$gonslate_quantity,\n"; }
    if (args.gonslate_income !== undefined) { gonslateProps += "income := <int32>$gonslate_income,\n"; }
    if (args.gonslate_upkeep !== undefined) { gonslateProps += "upkeep := <int32>$gonslate_upkeep,\n"; }

    return `\
update Country
filter .id = <uuid>$id
set {
    ${countryProps}
};

with module material
update Material
filter .kind = MaterialKind.Gold and .country.id = <uuid>$id
set {
    ${goldProps}
};

with module material
update Material
filter .kind = MaterialKind.Foodstuffs and .country.id = <uuid>$id
set {
    ${foodstuffsProps}
};

with module material
update Material
filter .kind = MaterialKind.Construction and .country.id = <uuid>$id
set {
    ${constructionProps}
};

with module material
update Material
filter .kind = MaterialKind.Luxuries and .country.id = <uuid>$id
set {
    ${luxuriesProps}
};

with module material
update Material
filter .kind = MaterialKind.Catalyst and .country.id = <uuid>$id
set {
    ${catalystProps}
};

with module material
update Material
filter .kind = MaterialKind.Gonslate and .country.id = <uuid>$id
set {
    ${gonslateProps}
};`;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<UpdateCountryArgs>(event);

    const mutation = createMutation(body);

    await client.execute(mutation, {
        id: event.context.params!.id,
        ...body,
    });

    return {
        status: "OK",
    };
});
