CREATE MIGRATION m1zr66lhlqcahyhdrggwb5szxedic6yp4eor6n444q2z4oxgigympa
    ONTO m1fow2tkd5zwl6c45wtvlikcwqzz5fe3v7ogzkbir5dnb4xsj5ztla
{
  ALTER TYPE ship::Ship {
      CREATE CONSTRAINT std::expression ON (((((.status = ship::ShipStatus.Available) OR (.status = ship::ShipStatus.Busy)) AND NOT (EXISTS (.progress))) OR ((.status = ship::ShipStatus.InUse) AND EXISTS (.progress))));
  };
};
