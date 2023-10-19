module ship {
    scalar type ShipStatus extending enum<Available, InUse, Busy>;

    abstract type Ship {
        # What state the ship is in
        required status: ShipStatus {
            default := ShipStatus.Available;
        }

        # The progress of the current status
        optional progress: tuple<current: int32, total: int32> {
            constraint expression on (__subject__.current >= 0 and __subject__.total >= 1 and __subject__.current < __subject__.total);
        }

        # Disallow progress for certain statuses
        constraint expression on (
            ((.status = ShipStatus.Available or .status = ShipStatus.Busy) and not exists .progress) or
            ((.status = ShipStatus.InUse) and exists .progress)
        );
    }

    type Boat extending Ship {
        single link owner := .<boats[is default::Country];
    }

    type Airship extending Ship {
        single link owner := .<airships[is default::Country];
    }
}
