CREATE MIGRATION m1ock7sdsey2svgvjpzkqr6nrljlyjpmrlraya2ogmv7vl6n2vt77q
    ONTO m1ngka36f7il7oetrw7fh2e3objbimbspdaev6re7eolrn7u34vbda
{
  CREATE FUNCTION default::countryFoodConsumption(size: default::CountrySize) ->  std::int32 {
      SET volatility := 'Stable';
      USING ((<std::int32>(std::to_json('{"Small": 5, "Medium": 20, "Large": 30}'))[<std::str>size] ?? <std::int32>0))
  ;};
  ALTER TYPE default::Country {
      CREATE REQUIRED PROPERTY consumes_foodstuffs: std::bool {
          SET default := true;
      };
  };
};
