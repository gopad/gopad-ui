# Gopad: Web UI

[![Build Status](http://github.dronehippie.de/api/badges/gopad/gopad-ui/status.svg)](http://github.dronehippie.de/gopad/gopad-ui)
[![Stories in Ready](https://badge.waffle.io/gopad/gopad-api.svg?label=ready&title=Ready)](http://waffle.io/gopad/gopad-api)
[![Join the Matrix chat at https://matrix.to/#/#gopad:matrix.org](https://img.shields.io/badge/matrix-%23gopad%3Amatrix.org-7bc9a4.svg)](https://matrix.to/#/#gopad:matrix.org)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2e41fc2d144c45c18832412c714dcea1)](https://www.codacy.com/app/gopad/gopad-ui?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gopad/gopad-ui&amp;utm_campaign=Badge_Grade)
[![Go Doc](https://godoc.org/github.com/gopad/gopad-ui/server?status.svg)](http://godoc.org/github.com/gopad/gopad-ui/server)
[![Go Report](http://goreportcard.com/badge/github.com/gopad/gopad-ui)](http://goreportcard.com/report/github.com/gopad/gopad-ui)
[![](https://images.microbadger.com/badges/image/gopad/gopad-ui.svg)](http://microbadger.com/images/gopad/gopad-ui "Get your own image badge on microbadger.com")


**This project is under heavy development, it's not in a working state yet!**

TBD


## Build

This project requires NodeJS to build the sources, the installation of NodeJS won't be covered by those instructions. To build the sources just execute the following command after NodeJS setup:

```
yarn install
yarn build
```

If you also want to publish it as a single binary with our server based on Go make sure you have a working Go environment, for further reference or a guide take a look at the [install instructions](http://golang.org/doc/install.html). As this project relies on vendoring you have to use a Go version `>= 1.6`

```bash
go get -d github.com/gopad/gopad-ui
cd $GOPATH/src/github.com/gopad/gopad-ui
make generate build

./gopad-ui -h
```

With the `make generate` command we are embedding all the static assets into the binary so there is no need for any webserver or anything else beside launching this binary.


## Development

To start developing on this UI you have to execute only a few commands. To setup a NodeJS environment or even a Go environment is out of the scope of this document. To start development just execute those commands:

```
yarn install
yarn watch

./gopad-ui server --static dist/static/
```

The development server reloads the used assets on every request. So in order to properly work with it you need to start the API separately. After launching this command on a terminal you can access the web interface at [http://localhost:9000](http://localhost:9000)


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
