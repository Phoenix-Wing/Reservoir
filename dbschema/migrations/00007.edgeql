CREATE MIGRATION m1g7ul6jmzj6qxtey6gs2vhcy43ktgstg574mh6mes2uppcux3e5ia
    ONTO m17tmqfc7abghjzcbr472zf6g655ssxhtrxydnt2l26robxri2qnfq
{
  ALTER TYPE default::Country {
      CREATE REQUIRED PROPERTY army_units -> std::int32 {
          SET default := 0;
          CREATE CONSTRAINT std::min_value(0);
      };
  };
};
