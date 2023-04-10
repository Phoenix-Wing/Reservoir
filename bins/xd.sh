#!/bin/bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

####################
# Public Variables #
####################

# 0 = Disabled, 1 = Default, >1 = Verbose
X_VERBOSITY=${X_VERBOSITY:-1}

#############
# Functions #
#############

x_help() {
    echo "Usage: ./bins/xd.sh COMMAND

Description:
    A utility shell script for use in developing the Reservoir project. Make
    sure to run this from the root directory of the project! Do not 'cd' into
    bins/.

    xd.sh is for use in development, while xr.sh is packaged with deployment.

Commands:
    help --help -h
        Prints this help screen.
    release
        Builds a production version of Reservoir and saves it to
        reservoir.tar.gz."
}

x_release() {
    # Build production server
    npm run clean
    npm run build

    # Copy over EdgeDB project and migrations
    cp edgedb.toml .output/edgedb.toml
    mkdir -p .output/dbschema/migrations
    cp -R dbschema/migrations/*.edgeql .output/dbschema/migrations/

    # Copy over xr.sh utiltiy script
    cp bins/xr.sh .output/xr.sh

    # Copy over README
    cp README.md .output/README.md

    # Create archive with .output folder
    tar -cf reservoir.tar .output/*
    gzip reservoir.tar

    if [[ $X_VERBOSITY -ge 1 ]]; then
        echo Production build of Reservoir built to reservoir.tar.gz!
    fi
}

#######
# Run #
#######

if [[ -z $1 || $1 == "help" || $1 == "--help" || $1 == "-h" ]]; then
    x_help
elif [[ $1 == "release" ]]; then
    x_release
fi
