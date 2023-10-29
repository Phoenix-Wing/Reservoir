CREATE MIGRATION m1y4ockaoizrb2glaf3npbueeokraeayoj7w4m37zzlobxq6cufxsa
    ONTO m17s7dfos27yhiugma6q33dfefrijwaqqqndu4enhwvufseipbkksq
{
  # Reset all invalid ships to their default state
  with module ship
  update Ship
  filter not (((((.status = ship::ShipStatus.Available) OR (.status = ship::ShipStatus.Busy)) AND NOT (EXISTS (.progress))) OR ((.status = ship::ShipStatus.InUse) AND EXISTS (.progress))))
  set {
    status := ShipStatus.Available,
    progress := {},
  };

  ALTER TYPE ship::Ship {
      CREATE CONSTRAINT std::expression ON (((((.status = ship::ShipStatus.Available) OR (.status = ship::ShipStatus.Busy)) AND NOT (EXISTS (.progress))) OR ((.status = ship::ShipStatus.InUse) AND EXISTS (.progress))));
  };
};
