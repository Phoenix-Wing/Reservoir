module default {
    scalar type CountrySize extending enum<Small, Medium, Large>;

    type Country {
        # Any non-empty string
        required name: str {
            constraint exclusive;
            constraint min_len_value(1);
        }

        multi leaders: Member;

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
