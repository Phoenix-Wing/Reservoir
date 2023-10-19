CREATE MIGRATION m1masxidsqxoadzrcl3lzvzxbzdhwdv5n55vwlxpijp3wv5ee6jipa
    ONTO m17s7dfos27yhiugma6q33dfefrijwaqqqndu4enhwvufseipbkksq
{
  ALTER TYPE ship::Ship {
      CREATE CONSTRAINT std::expression ON (((((.status = ship::ShipStatus.Available) OR (.status = ship::ShipStatus.Busy)) AND NOT (EXISTS (.progress))) OR ((.status = ship::ShipStatus.InUse) AND EXISTS (.progress))));
  };
};
