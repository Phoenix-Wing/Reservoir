CREATE MIGRATION m13csocm37q727cor36zhnuso2i35gqpn6qrvd6r7du42b4wtwc3ka
    ONTO initial
{
  CREATE MODULE material IF NOT EXISTS;
  CREATE MODULE trade IF NOT EXISTS;
  CREATE FUTURE nonrecursive_access_policies;
  CREATE SCALAR TYPE material::MaterialKind EXTENDING enum<Gold, Foodstuffs, Construction, Luxuries, Catalyst, Gonslate>;
  CREATE TYPE default::Country {
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY notes: std::str {
          SET default := '';
          CREATE CONSTRAINT std::max_len_value(500);
      };
  };
  CREATE TYPE trade::Trade {
      CREATE REQUIRED SINGLE LINK country_a: default::Country;
      CREATE REQUIRED SINGLE LINK country_b: default::Country;
      CREATE CONSTRAINT std::expression ON ((.country_a != .country_b));
      CREATE REQUIRED PROPERTY elapsed_weeks: std::int16 {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY total_weeks: std::int16 {
          CREATE CONSTRAINT std::min_value(1);
      };
      CREATE CONSTRAINT std::expression ON ((.elapsed_weeks <= .total_weeks));
      CREATE REQUIRED PROPERTY material_a: material::MaterialKind;
      CREATE REQUIRED PROPERTY material_b: material::MaterialKind;
      CREATE REQUIRED PROPERTY quantity_a: std::int32;
      CREATE REQUIRED PROPERTY quantity_b: std::int32;
      CREATE REQUIRED PROPERTY repeating: std::bool {
          SET default := false;
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
      CREATE REQUIRED PROPERTY profit := ((.income - .upkeep));
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
