with module material
update Material
filter .profit != 0
set {
    # Manually calculate profit, because .profit includes foodstuff costs
    quantity := max({.quantity + .income - .upkeep, 0}),
}
