CREATE MIGRATION m1qoefaxuskkvpu3dicyguhdjvhw6g444whun23mozjqni7q63ac2q
    ONTO m1evh6x4iqqzy2v6tgosazrrmtol7enpidq474ryhyobn6iul7tzrq
{
  ALTER TYPE material::Material {
      ALTER PROPERTY profit {
          USING (((((.income - .upkeep) - default::countryFoodConsumption(.country.size)) IF (.kind = material::MaterialKind.Foodstuffs) ELSE (.income - .upkeep)) ?? 0));
      };
  };
};
