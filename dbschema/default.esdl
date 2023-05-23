module default {
    type Country {
        # Any non-empty string
        required property name -> str {
            constraint exclusive;
            constraint min_len_value(1);
        }

        multi link leaders -> Member;

        # Positive number >= 0 && <= 9,223,372,036,854,775,807
        required property gold_store -> int64 {
            default := 0;
            constraint min_value(0);
        }

        # Any number >= 0 && <= 2,147,483,648
        required property gold_income -> int32 {
            default := 0;
            constraint min_value(0);
        }

        # Any number >= 0 && <= 2,147,483,648
        required property gold_upkeep -> int32 {
            default := 0;
            constraint min_value(0);
        }

        # Any number >= -2,147,483,648 && <= 2,147,483,648
        required property gold_profit := .gold_income - .gold_upkeep;

        # Positive number >= 0 && <= 9,223,372,036,854,775,807
        required property material_store -> int64 {
            default := 0;
            constraint min_value(0);
        }

        # Any number >= 0 && <= 2,147,483,648
        required property material_income -> int32 {
            default := 0;
            constraint min_value(0);
        }

        # Any number >= 0 && <= 2,147,483,648
        required property material_upkeep -> int32 {
            default := 0;
            constraint min_value(0);
        }

        # Any number >= -2,147,483,648 && <= 2,147,483,648
        required property material_profit := .material_income - .material_upkeep;

        # Positive number >= 0 && <= 2,147,483,648
        required property population -> int32 {
            default := 0;
            constraint min_value(0);
        }

        # Positive number >= 0 && <= 2,147,483,648
        required property army_units -> int32 {
            default := 0;
            constraint min_value(0);
        }

        # Country notes for dungeon masters
        required property notes -> str {
            default := "";
            constraint max_len_value(500);
        }
    }

    type Member {
        # Any non-empty string
        required property name -> str {
            constraint exclusive;
            constraint min_len_value(1);
        }

        # Any non-empty string
        property ig_name -> str {
            constraint min_len_value(1);
        }

        multi link countries := .<leaders[is Country];
    }
}
