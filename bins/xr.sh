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
    echo "Usage: ./xr.sh COMMAND

Description:
    A utility shell script for use in deploying the Reservoir project. This
    will be bundled alongside all other files required for deployment. This
    program assumes that it is being called from the root directory of the
    project.
    
    xr.sh is used for deployment, while xd.sh is for use in development.

Commands:
    help --help -h
        Prints this help screen.
    first-install
        Initializes the deployment for the first time. If you want to update
        your deployment, use the update command.
    update NEW_DEPLOYMENT_ARCHIVE
        Updates a current project with a given deployment archive.

Examples:
    Install for the first time after downloading reservoir.tar.gz.
    
        tar -xf reservoir.tar.gz
        cd reservoir
        chmod +x ./xr.sh
        ./xr.sh first-install
    
    Update the current deployment with a newer reservoir.tar.gz.
    
        cd old_deployment/
        ./xr.sh update ../new_reservoir.tar.gz"
}

x_first_install() {
    echo "TODO: first-install"
}

x_update() {
    echo "TODO: update"
}

#######
# Run #
#######

# Prevent script for dying when no parameter is passed.
hack_first_arg=${1:-}

if [[ -z $hack_first_arg ]]; then
    x_help
elif [[ $1 == "help" || $1 == "--help" || $1 == "-h" ]]; then
    x_help
elif [[ $1 == "first-install" ]]; then
    x_first_install
elif [[ $1 == "update" ]]; then
    x_update
fi
