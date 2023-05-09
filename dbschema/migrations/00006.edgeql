CREATE MIGRATION m17tmqfc7abghjzcbr472zf6g655ssxhtrxydnt2l26robxri2qnfq
    ONTO m1m5fetu4ynx5w5n55umv5mjqvddxi6ubbianxeczi4umbqtxmmvha
{
  ALTER TYPE default::Country {
      ALTER LINK leader {
          SET MULTI;
          RENAME TO leaders;
      };
  };
};
