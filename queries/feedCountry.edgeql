with module material
update Material
filter (
    .kind = MaterialKind.Foodstuffs and
    .country.consumes_foodstuffs and
    .quantity > 0
)
set {
    quantity := max({
        .quantity - default::countryFoodConsumption(.country.size),
        0,
    }),
};
