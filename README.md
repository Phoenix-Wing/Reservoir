# Reservoir

Reservoir is a [Nuxt](https://nuxt.com) website using [Vue](https://vuejs.org) and [NaiveUI](https://www.naiveui.com/en-US/os-theme) backed by the [EdgeDB](https://www.edgedb.com) database. It is written for a D&D-like club where players control countries and can trade, war, and interact with each other.

## Requirements

- Node.js 19 (Should work on LTS 18, but untested)
- EdgeDB 2.11 ([See installation page](https://www.edgedb.com/install))

## Usage

You can download the latest stable-(ish) version of the code from the [releases](https://github.com/Phoenix-Wing/Reservoir/releases) page. Extract the tar file into a new directory, then run the following commands.

```shell
# Check that tools are installed
$ node --version && edgedb --version
v19.7.0
EdgeDB CLI 2.3.1+5d93f42

# Create and migrate new database
$ edgedb project init

# Run server
$ node ./server/index.mjs
Listening http://[::]:3000
```

You can also manage your installation with `xr.sh`.

```shell
$ ./xr.sh --help
```

## Contributing

While Reservoir is scoped to the extent that it will be very difficult for new people to add features to it, I still greatly appreciate attempts to improve my code. Pull requests are welcome, but may be denied if they do not fit the scope of the project or are deemed unecessary. Thanks!

Developing the project needs the [requirements](#requirements) as listed above.

```shell
# Download code locally
$ git clone https://github.com/Phoenix-Wing/Reservoir.git
$ cd Reservoir

# Install dependencies and setup database
$ edgedb project init
$ npm i

# Begin development server
$ npm run dev
```

You can learn more about developing Nuxt websites with their [guide](https://nuxt.com/docs/getting-started/introduction).

### Building locally

Run the steps stated previously (except `npm run dev`), then do the following:

```shell
# Packages all necessary files into reservoir.tar.gz
$ ./bins/xd.sh release
```

> **Warning**
>
> If you want to continue developing after building for production, you will need to do the following:
>
> ```shell
> $ npm run clean
> $ npm run dev:queryBuilder
> $ npm run dev
> ```
>
> This is due to incompatibilities with [EdgeDB's generator](https://www.edgedb.com/docs/clients/js/generation) using different JS flavors and build variants.
