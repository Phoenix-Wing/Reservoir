module default {
    scalar type CountrySize extending enum<Small, Medium, Large>;

    function countryFoodConsumption(size: CountrySize) -> int32 {
        # Function cannot modify database, returns same results given same input
        volatility := "Stable";
        using (
            # Returns consumption amount, else 0
            <int32>(
                to_json('{"Small": 5, "Medium": 20, "Large": 30}')[<str>size]
            ) ?? <int32>0
        );
    }

    type Country {
        # Any non-empty string
        required name: str {
            constraint exclusive;
            constraint min_len_value(1);
        }

        # All members who lead this country
        multi leaders: Member;

        # The size of the country: small, medium, or large
        required size: CountrySize;

        # The main currency system
        required gold: material::Material {
            default := (
                insert material::Material {
                    kind := material::MaterialKind.Gold,
                }
            );
            constraint exclusive;
            on source delete delete target;
        }

        # Food required to feed your population
        required foodstuffs: material::Material {
            default := (
                insert material::Material {
                    kind := material::MaterialKind.Foodstuffs,
                }
            );
            constraint exclusive;
            on source delete delete target;
        }

        # Materials used for building structures and things
        required construction: material::Material {
            default := (
                insert material::Material {
                    kind := material::MaterialKind.Construction,
                }
            );
            constraint exclusive;
            on source delete delete target;
        }

        # Increases nobility happiness
        required luxuries: material::Material {
            default := (
                insert material::Material {
                    kind := material::MaterialKind.Luxuries,
                }
            );
            constraint exclusive;
            on source delete delete target;
        }

        # Popular Catalyst ingredients used by armies and infrastructure
        required catalyst: material::Material {
            default := (
                insert material::Material {
                    kind := material::MaterialKind.Catalyst,
                }
            );
            constraint exclusive;
            on source delete delete target;
        }

        # The main fuel required for airships
        required gonslate: material::Material {
            default := (
                insert material::Material {
                    kind := material::MaterialKind.Gonslate,
                }
            );
            constraint exclusive;
            on source delete delete target;
        }

        # Whether to decrease foodstuffs every meeting or not.
        required consumes_foodstuffs: bool {
            default := true;
        }

        multi boats: ship::Boat {
            constraint exclusive;
            on source delete delete target if orphan;
            on target delete allow;
        }

        multi airships: ship::Airship {
            constraint exclusive;
            on source delete delete target if orphan;
            on target delete allow;
        }

        # Country notes for dungeon masters
        required notes: str {
            default := "";
            constraint max_len_value(500);
        }
    }

    type Member {
        # Any non-empty string
        required name: str {
            constraint exclusive;
            constraint min_len_value(1);
        }

        # Any non-empty string
        ig_name: str {
            constraint min_len_value(1);
        }

        # Backlink to which countries this member has control of
        multi link countries := .<leaders[is Country];
    }
}
