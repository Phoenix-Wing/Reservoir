select {
    total := count((select Country)),
    countries := (
        select Country {
            id,
            name,
            leaders: {
                id,
                name,
                ig_name,
            },
        }
        order by .name
        offset <optional int64>$offset
        limit <optional int64>$limit
    ),
}
