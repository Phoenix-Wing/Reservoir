with gold_materials := (
  with module material
  select Material
  filter .kind = MaterialKind.Gold
)
select {
  countries := count((select Country)),
  members := count((select Member)),
  gold_quantity := sum(gold_materials.quantity),
  gold_profit := sum(gold_materials.profit),
};
