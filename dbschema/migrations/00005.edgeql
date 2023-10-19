CREATE MIGRATION m1fow2tkd5zwl6c45wtvlikcwqzz5fe3v7ogzkbir5dnb4xsj5ztla
    ONTO m1qoefaxuskkvpu3dicyguhdjvhw6g444whun23mozjqni7q63ac2q
{
  ALTER TYPE ship::Ship {
      DROP CONSTRAINT std::expression ON ((((((.status = ship::ShipStatus.Available) OR (.status = ship::ShipStatus.Damaged)) OR (.status = ship::ShipStatus.Destroyed)) AND NOT (EXISTS (.progress))) OR (((.status = ship::ShipStatus.Busy) OR (.status = ship::ShipStatus.InRepair)) AND EXISTS (.progress))));
  };
  ALTER SCALAR TYPE ship::ShipStatus EXTENDING enum<Available, InUse, Busy>;
};
