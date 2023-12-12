CREATE MIGRATION m1by642oylkhmthx2c3i4a7ncwav5aqooxtin2ghrnwjfdrv4rgrrq
    ONTO initial
{
  CREATE MODULE material IF NOT EXISTS;
  CREATE MODULE ship IF NOT EXISTS;
  CREATE SCALAR TYPE default::CountrySize EXTENDING enum<Small, Medium, Large>;
  CREATE FUNCTION default::countryFoodConsumption(size: default::CountrySize) ->  std::int32 {
      SET volatility := 'Stable';
      USING ((<std::int32>(std::to_json('{"Small": 5, "Medium": 20, "Large": 30}'))[<std::str>size] ?? <std::int32>0))
  ;};
  CREATE SCALAR TYPE material::MaterialKind EXTENDING enum<Gold, Foodstuffs, Construction, Luxuries, Catalyst, Gonslate>;
  CREATE TYPE default::Country {
      CREATE REQUIRED PROPERTY size: default::CountrySize;
      CREATE REQUIRED PROPERTY consumes_foodstuffs: std::bool {
          SET default := true;
      };
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY notes: std::str {
          SET default := '';
          CREATE CONSTRAINT std::max_len_value(500);
      };
  };
  CREATE TYPE material::Material {
      CREATE REQUIRED PROPERTY kind: material::MaterialKind;
      CREATE REQUIRED PROPERTY income: std::int32 {
          SET default := 0;
          CREATE CONSTRAINT std::min_value(0);
      };
      CREATE REQUIRED PROPERTY upkeep: std::int32 {
          SET default := 0;
          CREATE CONSTRAINT std::min_value(0);
      };
      CREATE REQUIRED PROPERTY quantity: std::int64 {
          SET default := 0;
          CREATE CONSTRAINT std::min_value(0);
      };
  };
  ALTER TYPE default::Country {
      CREATE REQUIRED LINK catalyst: material::Material {
          SET default := (INSERT
              material::Material
              {
                  kind := material::MaterialKind.Catalyst
              });
          ON SOURCE DELETE DELETE TARGET;
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED LINK construction: material::Material {
          SET default := (INSERT
              material::Material
              {
                  kind := material::MaterialKind.Construction
              });
          ON SOURCE DELETE DELETE TARGET;
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED LINK foodstuffs: material::Material {
          SET default := (INSERT
              material::Material
              {
                  kind := material::MaterialKind.Foodstuffs
              });
          ON SOURCE DELETE DELETE TARGET;
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED LINK gold: material::Material {
          SET default := (INSERT
              material::Material
              {
                  kind := material::MaterialKind.Gold
              });
          ON SOURCE DELETE DELETE TARGET;
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED LINK gonslate: material::Material {
          SET default := (INSERT
              material::Material
              {
                  kind := material::MaterialKind.Gonslate
              });
          ON SOURCE DELETE DELETE TARGET;
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED LINK luxuries: material::Material {
          SET default := (INSERT
              material::Material
              {
                  kind := material::MaterialKind.Luxuries
              });
          ON SOURCE DELETE DELETE TARGET;
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE material::Material {
      CREATE SINGLE LINK country := ((.<gold[IS default::Country] ?? (.<foodstuffs[IS default::Country] ?? (.<construction[IS default::Country] ?? (.<luxuries[IS default::Country] ?? (.<catalyst[IS default::Country] ?? .<gonslate[IS default::Country]))))));
      CREATE REQUIRED PROPERTY profit := (((((.income - .upkeep) - default::countryFoodConsumption(.country.size)) IF (.kind = material::MaterialKind.Foodstuffs) ELSE (.income - .upkeep)) ?? 0));
  };
  CREATE FUTURE nonrecursive_access_policies;
  CREATE SCALAR TYPE ship::ShipStatus EXTENDING enum<Available, InUse, Busy>;
  CREATE ABSTRACT TYPE ship::Ship {
      CREATE OPTIONAL PROPERTY progress: tuple<current: std::int32, total: std::int32> {
          CREATE CONSTRAINT std::expression ON ((((__subject__.current >= 0) AND (__subject__.total >= 1)) AND (__subject__.current < __subject__.total)));
      };
      CREATE REQUIRED PROPERTY status: ship::ShipStatus {
          SET default := (ship::ShipStatus.Available);
      };
      CREATE CONSTRAINT std::expression ON (((((.status = ship::ShipStatus.Available) OR (.status = ship::ShipStatus.Busy)) AND NOT (EXISTS (.progress))) OR ((.status = ship::ShipStatus.InUse) AND EXISTS (.progress))));
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
  CREATE TYPE default::Member {
      CREATE PROPERTY ig_name: std::str {
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::min_len_value(1);
      };
  };
  ALTER TYPE default::Country {
      CREATE MULTI LINK leaders: default::Member;
  };
  ALTER TYPE default::Member {
      CREATE MULTI LINK countries := (.<leaders[IS default::Country]);
  };
};
