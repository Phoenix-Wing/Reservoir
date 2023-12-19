insert Country {
    name := <str>$name,
    leaders := (select Member filter .id = <uuid>$leader),
    size := <CountrySize>$size,
}
