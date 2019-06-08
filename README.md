# Gopad: Web UI

[![Build Status](https://cloud.drone.io/api/badges/gopad/gopad-ui/status.svg)](https://cloud.drone.io/gopad/gopad-ui)
[![Join the Matrix chat at https://matrix.to/#/#gopad:matrix.org](https://img.shields.io/badge/matrix-%23gopad-7bc9a4.svg)](https://matrix.to/#/#gopad:matrix.org)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2e41fc2d144c45c18832412c714dcea1)](https://www.codacy.com/app/gopad/gopad-ui?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gopad/gopad-ui&amp;utm_campaign=Badge_Grade)
[![Go Doc](https://godoc.org/github.com/gopad/gopad-ui/server?status.svg)](http://godoc.org/github.com/gopad/gopad-ui/server)
[![Go Report](http://goreportcard.com/badge/github.com/gopad/gopad-ui)](http://goreportcard.com/report/github.com/gopad/gopad-ui)
[![](https://images.microbadger.com/badges/image/gopad/gopad-ui.svg)](http://microbadger.com/images/gopad/gopad-ui "Get your own image badge on microbadger.com")

**This project is under heavy development, it's not in a working state yet!**

Within this repository we are building the web interface for our [Gopad API](https://github.com/gopad/gopad-api) server, for further information take a look at our [documentation](https://gopad.tech).


## Install

You can download prebuilt binaries from the GitHub releases or from our [download site](http://dl.gopad.tech/ui). You are a Mac user? Just take a look at our [homebrew formula](https://github.com/gopad/homebrew-gopad).

If you want to serve the UI by a regular webserver you can also find a tarball on our downloads server to just get the assets.


## Build

This project requires NodeJS and Yarn to build the sources, the installation of NodeJS or Yarn won't be covered by these instructions, please follow the official documentation for [NodeJS](https://nodejs.org/en/download/package-manager/) and [Yarn](https://yarnpkg.com/lang/en/docs/install/). To build the sources just execute the following command after the setup:

```
yarn install
yarn build
```

If you also want to publish it as a single binary with our server written in Go make sure you have a working Go environment, for further reference or a guide take a look at the [install instructions](http://golang.org/doc/install.html). This project requires Go >= v1.11.

```bash
git clone https://github.com/gopad/gopad-ui.git
cd gopad-ui

make generate build

./bin/gopad-ui -h
```

With the `make generate` command we are embedding all the static assets into the binary so there is no need for any webserver or anything else beside launching this binary.


## Development

To start developing on this UI you have to execute only a few commands. To setup a NodeJS environment or even a Go environment is out of the scope of this document. To start development just execute those commands:

```bash
yarn install
yarn watch

make generate build
./bin/gopad-ui --log-level debug server --static dist/static/
```

The development server reloads the used assets on every request. To properly work with it you need to start the [API server](https://github.com/gopad/gopad-api) separately since this project doesn't include it. After launching this command on a terminal you can access the web interface at [http://localhost:8080](http://localhost:8080).


## Security

If you find a security issue please contact thomas@webhippie.de first.


## Contributing

Fork -> Patch -> Push -> Pull Request


## Authors

* [Thomas Boerger](https://github.com/tboerger)


## License

Apache-2.0


## Copyright

```
Copyright (c) 2018 Thomas Boerger <thomas@webhippie.de>
```
