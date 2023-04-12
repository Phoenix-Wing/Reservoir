CREATE MIGRATION m1m5fetu4ynx5w5n55umv5mjqvddxi6ubbianxeczi4umbqtxmmvha
    ONTO m1gadpkhq6ia637cb2ddcdhuh5qr34ughz3zgh5yc4hso2nqr5jeiq
{
  ALTER TYPE default::Country {
      CREATE REQUIRED PROPERTY notes -> std::str {
          SET default := '';
          CREATE CONSTRAINT std::max_len_value(500);
      };
  };
};
