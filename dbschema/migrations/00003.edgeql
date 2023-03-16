CREATE MIGRATION m1kuh52yo2qd6w5achmny4wavtoeesjbutwi4blb3vyrgbqwzfw3mq
    ONTO m1jik5bi7a5yu7slvhkphhtndui2udzypytxvwpdcf5vqno75lqgmq
{
  ALTER TYPE default::Country {
      ALTER PROPERTY gold_income {
          CREATE CONSTRAINT std::min_value(0);
      };
  };
  ALTER TYPE default::Country {
      CREATE REQUIRED PROPERTY gold_upkeep -> std::int32 {
          SET default := 0;
          CREATE CONSTRAINT std::min_value(0);
      };
  };
  ALTER TYPE default::Country {
      CREATE REQUIRED PROPERTY gold_profit := ((.gold_income - .gold_upkeep));
      ALTER PROPERTY material_income {
          CREATE CONSTRAINT std::min_value(0);
      };
  };
  ALTER TYPE default::Country {
      CREATE REQUIRED PROPERTY material_upkeep -> std::int32 {
          SET default := 0;
          CREATE CONSTRAINT std::min_value(0);
      };
  };
  ALTER TYPE default::Country {
      CREATE REQUIRED PROPERTY material_profit := ((.material_income - .material_upkeep));
  };
};
