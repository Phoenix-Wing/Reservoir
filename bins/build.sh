#!/bin/bash

# Builds the project and bundles it into reservoir.tar.gz
#
# You can run pnpm build or run this script directly.

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

# Switch into the main project directory
cd $(dirname $0)/../

# Clean and build project with Nuxt
pnpm run clean
pnpm run build:partial

# Copy update script
cp bins/update.sh .output/

# Copy over README
cp README.md .output/README.md

# Copy EdgeDB config and migrations
cp edgedb.toml .output/edgedb.toml
mkdir -p .output/dbschema/{migrations,fixups}
cp -R dbschema/migrations/*.edgeql .output/dbschema/migrations/
cp -R dbschema/fixups/*.edgeql .output/dbschema/fixups/

# Bundle output into a tar file
tar -czf reservoir.tar.gz .output/*

echo "Successfully build Reservoir for deployment."
