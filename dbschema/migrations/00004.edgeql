CREATE MIGRATION m17s7dfos27yhiugma6q33dfefrijwaqqqndu4enhwvufseipbkksq
    ONTO m1evh6x4iqqzy2v6tgosazrrmtol7enpidq474ryhyobn6iul7tzrq
{
  ALTER TYPE material::Material {
      ALTER PROPERTY profit {
          USING (((((.income - .upkeep) - default::countryFoodConsumption(.country.size)) IF (.kind = material::MaterialKind.Foodstuffs) ELSE (.income - .upkeep)) ?? 0));
      };
  };
  ALTER TYPE ship::Ship {
      DROP CONSTRAINT std::expression ON ((((((.status = ship::ShipStatus.Available) OR (.status = ship::ShipStatus.Damaged)) OR (.status = ship::ShipStatus.Destroyed)) AND NOT (EXISTS (.progress))) OR (((.status = ship::ShipStatus.Busy) OR (.status = ship::ShipStatus.InRepair)) AND EXISTS (.progress))));
  };
  ALTER SCALAR TYPE ship::ShipStatus EXTENDING enum<Available, InUse, Busy>;
};
