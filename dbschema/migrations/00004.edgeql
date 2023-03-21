CREATE MIGRATION m1gadpkhq6ia637cb2ddcdhuh5qr34ughz3zgh5yc4hso2nqr5jeiq
    ONTO m1kuh52yo2qd6w5achmny4wavtoeesjbutwi4blb3vyrgbqwzfw3mq
{
  ALTER TYPE default::Country {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Member {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
