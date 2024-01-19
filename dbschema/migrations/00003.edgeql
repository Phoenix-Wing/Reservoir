CREATE MIGRATION m1sdefsce7d4k6x6nac7burugpofl7q3a2axuwpvf2u4dhqkj4tuea
    ONTO m1fzjrb4ugqnucgajehmaqhc4c4ohlywfyfdwfvlo55jjvuip42mha
{
  ALTER TYPE material::Material {
      ALTER PROPERTY profit {
          USING (((((.income - .upkeep) - default::countryFoodConsumption(.country.size)) IF ((.kind = material::MaterialKind.Foodstuffs) AND .country.consumes_foodstuffs) ELSE (.income - .upkeep)) ?? 0));
      };
  };
};
