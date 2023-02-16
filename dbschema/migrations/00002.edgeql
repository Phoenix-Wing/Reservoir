CREATE MIGRATION m1mfutbli3s2qlyajkdfgpc5wtdxwkia2beuo55xyecvn4grqwldfa
    ONTO m16smqiffrfejvy3augh3t5gv6entzyigx3h46sbvcsmsajdtgc6cq
{
  CREATE TYPE default::Country {
      CREATE REQUIRED PROPERTY gold_income -> std::int32 {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY gold_store -> std::int64 {
          SET default := 0;
          CREATE CONSTRAINT std::min_value(0);
      };
      CREATE REQUIRED PROPERTY material_income -> std::int32 {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY material_store -> std::int64 {
          SET default := 0;
          CREATE CONSTRAINT std::min_value(0);
      };
      CREATE REQUIRED PROPERTY name -> std::str;
  };
  CREATE TYPE default::Member {
      CREATE PROPERTY ig_name -> std::str;
      CREATE REQUIRED PROPERTY name -> std::str;
  };
  ALTER TYPE default::Country {
      CREATE LINK leader -> default::Member;
  };
  ALTER TYPE default::Member {
      CREATE MULTI LINK countries := (.<leader[IS default::Country]);
  };
};
