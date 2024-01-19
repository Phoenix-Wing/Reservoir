module material {
    # The type of material being described
    scalar type MaterialKind extending enum<Gold, Foodstuffs, Construction, Luxuries, Catalyst, Gonslate>;

    # Represents country-specific information for a type of material
    type Material {
        required kind: MaterialKind;

        # The amount of a Material currently in possession
        required quantity: int64 {
            default := 0;
            constraint min_value(0);
        }

        # Unlabelled income per-week
        required income: int32 {
            default := 0;
            constraint min_value(0);
        }

        # Unlabelled cost per-week
        required upkeep: int32 {
            default := 0;
            constraint min_value(0);
        }

        # The net profit of the resource
        required property profit := (
            (.income - .upkeep - default::countryFoodConsumption(.country.size))
            if .kind = MaterialKind.Foodstuffs and .country.consumes_foodstuffs else (.income - .upkeep)
        ) ?? 0;

        # Backlink to the country owning this material stat
        single link country := (
            .<gold[is default::Country] ??
            .<foodstuffs[is default::Country] ??
            .<construction[is default::Country] ??
            .<luxuries[is default::Country] ??
            .<catalyst[is default::Country] ??
            .<gonslate[is default::Country]
        );
    }
}
