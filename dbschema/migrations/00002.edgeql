CREATE MIGRATION m1fzjrb4ugqnucgajehmaqhc4c4ohlywfyfdwfvlo55jjvuip42mha
    ONTO m1by642oylkhmthx2c3i4a7ncwav5aqooxtin2ghrnwjfdrv4rgrrq
{
  ALTER TYPE default::Country {
      ALTER LINK leaders {
          ON TARGET DELETE ALLOW;
      };
  };
};
