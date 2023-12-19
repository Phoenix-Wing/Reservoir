#!/bin/bash

# Updates the current deployment to a newer version of Reservoir.
#
# This script is not meant to be run in development, but instead is bundled with reservoir.tar.gz.

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

# Get absolute path of new archive
newArchive=$(readlink -f $1)

echo "Updating instance from archive $newArchive."

# Switch into the main deployment directory
cd $(dirname $0)

# Delete the previous backup
rm -rf .previous/

# Delete and recreate the temporary directory
rm -rf .temp/
mkdir -p .temp/

# Copy the new archive to .temp/ and extract it
cp $newArchive .temp/reservoir.tar.gz
cd .temp/
tar -xf reservoir.tar.gz
mv .output/* .
rm -d .output/ reservoir.tar.gz
cd ../

# Backup current deloyment
mkdir -p .previous/
edgedb dump .previous/reservoir.dump
mv * .previous/

# Move new instance into current directory
mv .temp/* .
rm -d .temp/

# Migrate database
edgedb migrate

echo "Finished updating instance."
