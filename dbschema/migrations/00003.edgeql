CREATE MIGRATION m1evh6x4iqqzy2v6tgosazrrmtol7enpidq474ryhyobn6iul7tzrq
    ONTO m1ock7sdsey2svgvjpzkqr6nrljlyjpmrlraya2ogmv7vl6n2vt77q
{
  CREATE MODULE ship IF NOT EXISTS;
  CREATE SCALAR TYPE ship::ShipStatus EXTENDING enum<Available, Busy, InRepair, Damaged, Destroyed>;
  CREATE ABSTRACT TYPE ship::Ship {
      CREATE OPTIONAL PROPERTY progress: tuple<current: std::int32, total: std::int32> {
          CREATE CONSTRAINT std::expression ON ((((__subject__.current >= 0) AND (__subject__.total >= 1)) AND (__subject__.current < __subject__.total)));
      };
      CREATE REQUIRED PROPERTY status: ship::ShipStatus {
          SET default := (ship::ShipStatus.Available);
      };
      CREATE CONSTRAINT std::expression ON ((((((.status = ship::ShipStatus.Available) OR (.status = ship::ShipStatus.Damaged)) OR (.status = ship::ShipStatus.Destroyed)) AND NOT (EXISTS (.progress))) OR (((.status = ship::ShipStatus.Busy) OR (.status = ship::ShipStatus.InRepair)) AND EXISTS (.progress))));
  };
  CREATE TYPE ship::Airship EXTENDING ship::Ship;
  ALTER TYPE default::Country {
      CREATE MULTI LINK airships: ship::Airship {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          ON TARGET DELETE ALLOW;
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE ship::Airship {
      CREATE SINGLE LINK owner := (.<airships[IS default::Country]);
  };
  CREATE TYPE ship::Boat EXTENDING ship::Ship;
  ALTER TYPE default::Country {
      CREATE MULTI LINK boats: ship::Boat {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          ON TARGET DELETE ALLOW;
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE ship::Boat {
      CREATE SINGLE LINK owner := (.<boats[IS default::Country]);
  };
};
