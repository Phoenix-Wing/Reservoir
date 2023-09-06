with module material
update Material
filter .profit != 0
set {
    quantity := max({.quantity + .profit, 0}),
}
