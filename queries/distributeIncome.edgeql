update Country
filter .gold_profit != 0 or .material_profit != 0
set {
    gold_store := max({.gold_store + .gold_profit, 0}),
    material_store := max({.material_store + .material_profit, 0}),
}
