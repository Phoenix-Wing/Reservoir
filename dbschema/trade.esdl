module trade {
    type Trade {
        required single country_a: default::Country;

        required material_a: material::MaterialKind;
        required quantity_a: int32;

        required single country_b: default::Country;

        required material_b: material::MaterialKind;
        required quantity_b: int32;

        required elapsed_weeks: int16 {
            default := 0;
        }

        required total_weeks: int16 {
            # All trade must take at least one week to finish
            constraint min_value(1);
        }

        # Whether the trade will be renewed when finished
        required repeating: bool {
            default := False;
        }

        # Two countries must be different
        constraint expression on (.country_a != .country_b);

        # Elapsed weeks cannot be greater than total weeks
        constraint expression on (.elapsed_weeks <= .total_weeks);
    }
}
