select Member {
    id,
    name,
    ig_name,

    sum_gold := sum(.countries.gold_store),
    sum_materials := sum(.countries.material_store),
    sum_units := sum(.countries.army_units),

    countries: {
        id,
        name,
        gold_store,
        material_store,
        army_units,
    },
}
filter .id = <uuid>$id;
