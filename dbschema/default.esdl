module default {
    type Country {
        required property name -> str;
        link leader -> Member;

        # Positive number >= 0 && <= 9,223,372,036,854,775,807
        required property gold_store -> int64 {
            default := 0;
            constraint min_value(0);
        }

        # Any number >= -2,147,483,648 && <= 2,147,483,648
        required property gold_income -> int32 {
            default := 0;
        }

        # Positive number >= 0 && <= 9,223,372,036,854,775,807
        required property material_store -> int64 {
            default := 0;
            constraint min_value(0);
        }

        # Any number >= -2,147,483,648 && <= 2,147,483,648
        required property material_income -> int32 {
            default := 0;
        }

        # Positive number >= 0 && <= 2,147,483,648
        required property population -> int32 {
            default := 0;
            constraint min_value(0);
        }
    }

    type Member {
        required property name -> str;
        property ig_name -> str;

        multi link countries := .<leader[is Country];
    }
}
