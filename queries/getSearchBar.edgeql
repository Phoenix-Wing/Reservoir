with results := (select Country) union (select Member)
select results {
    id,
    name,
    kind := (select "Country" if results is Country else "Member"),
}
order by .name;
