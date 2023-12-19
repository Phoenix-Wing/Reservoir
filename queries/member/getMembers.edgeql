select {
    total := count((select Member)),
    members := (
        select Member {
            id,
            name,
            ig_name,
            countries,
        }
        order by .name
        offset <optional int64>$offset
        limit <optional int64>$limit
    ),
}
