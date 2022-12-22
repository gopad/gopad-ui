# Gopad: Web UI

[![General Workflow](https://github.com/gopad/gopad-ui/actions/workflows/general.yml/badge.svg)](https://github.com/gopad/gopad-ui/actions/workflows/general.yml) [![Join the Matrix chat at https://matrix.to/#/#gopad:matrix.org](https://img.shields.io/badge/matrix-%23gopad%3Amatrix.org-7bc9a4.svg)](https://matrix.to/#/#gopad:matrix.org) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/df9689895d604266ab02a3e18a686b0a)](https://www.codacy.com/gh/gopad/gopad-ui/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gopad/gopad-ui&utm_campaign=Badge_Grade) [![Go Reference](https://pkg.go.dev/badge/github.com/gopad/gopad-ui.svg)](https://pkg.go.dev/github.com/gopad/gopad-ui) [![GitHub Repo](https://img.shields.io/badge/github-repo-yellowgreen)](https://github.com/gopad/gopad-ui)

Within this repository we are building the web interface for our
[Gopad API][api] server, for further information take a look at our
[documentation][documentation].

## Install

You can download prebuilt binaries from the GitHub releases or from our
[download site][downloads]. You are a Mac user? Just take a look at our
[homebrew formula][homebrew].

If you want to serve the UI by a regular webserver you can also find a tarball
on our downloads server to just get the assets.

## Build

This project requires NodeJS to build the sources, the installation of NodeJS
won't be covered by these instructions, please follow the official documentation
for [NodeJS][nodejs]. To build the sources just execute the following command
after the setup.

If you also want to publish it as a single binary with our server written in Go
make sure you have a working Go environment, for further reference or a guide
take a look at the [install instructions][golang]. This project requires
Go >= v1.18, at least that's the version we are using.

```console
git clone https://github.com/gopad/gopad-ui.git
cd gopad-ui

npm install --ci
npm run build

make generate build
./bin/gopad-ui -h
```

We are embedding all the static assets into the binary so there is no need for
any webserver or anything else beside launching this binary.

## Development

To start developing on this UI you have to execute only a few commands. To setup
a NodeJS environment or even a Go environment is out of the scope of this
document. To start development just execute those commands:

```console
npm install --ci
npm run server

make generate build
./bin/gopad-ui --log-level debug server --static dist/static/
```

The development server reloads the used assets on every request. To properly
work with it you need to start the [API server][api] separately since this
project doesn't include it. After launching this command on a terminal you can
access the web interface at [http://localhost:8080](http://localhost:8080).

## Security

If you find a security issue please contact
[gopad@webhippie.de](mailto:gopad@webhippie.de) first.

## Contributing

Fork -> Patch -> Push -> Pull Request

## Authors

-   [Thomas Boerger](https://github.com/tboerger)

## License

Apache-2.0

## Copyright

```console
Copyright (c) 2018 Thomas Boerger <thomas@webhippie.de>
```

[api]: https://github.com/gopad/gopad-api
[documentation]: https://gopad.eu
[downloads]: http://dl.gopad.eu/ui
[homebrew]: https://github.com/gopad/homebrew-gopad
[nodejs]: https://nodejs.org/en/download/package-manager/
[golang]: http://golang.org/doc/install.html
