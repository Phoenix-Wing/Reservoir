with module ship
select Ship {
    *,
    kind := ("Airship" if Ship is Airship else "Boat"),
    boat_owner := [is Boat].owner { id, name },
    airship_owner := [is Airship].owner { id, name },
}
filter .id = <uuid>$id;
