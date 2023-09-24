CREATE MIGRATION m1z27irasghxkssofucwpecjlw2rbf2hx6aqjq27mt2zh26z66wbqa
    ONTO m1ngka36f7il7oetrw7fh2e3objbimbspdaev6re7eolrn7u34vbda
{
  ALTER TYPE default::Country {
      CREATE REQUIRED PROPERTY consumes_foodstuffs: std::bool {
          SET default := true;
      };
  };
};
