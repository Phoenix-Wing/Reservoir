# Finish ship voyage / repairs
with module ship
update Ship
filter exists .progress and .progress.current = .progress.total - 1
set {
    status := ShipStatus.Available,
    progress := {},
};

# Increase the progress of ships
with module ship
update Ship
filter exists .progress
set {
    progress := (
        current := .progress.current + 1,
        total := .progress.total,
    ),
};
