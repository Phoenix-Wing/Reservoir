select Country {
    id,
    name,

    leaders: {
        id,
        name,
        ig_name,
    },

    gold_store,
    gold_income,
    gold_upkeep,
    gold_profit,

    material_store,
    material_income,
    material_upkeep,
    material_profit,

    population,

    army_units,

    notes,
}
filter .id = <uuid>$id;
