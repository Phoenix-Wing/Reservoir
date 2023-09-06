select Member {
    *,

    gold_sum := sum(.countries.gold.quantity),

    countries: {
        id,
        name,
        gold_quantity := .gold.quantity,
    },
}
filter .id = <uuid>$id;
