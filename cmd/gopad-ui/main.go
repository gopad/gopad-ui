package main

import (
	"os"
	"runtime"
	"strings"
	"time"

	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/log/level"
	"github.com/joho/godotenv"
	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/version"
	"gopkg.in/urfave/cli.v2"
)

var (
	appName = "gopad-ui"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	if env := os.Getenv("GOPAD_ENV_FILE"); env != "" {
		godotenv.Load(env)
	}

	app := &cli.App{
		Name:     appName,
		Version:  version.Version.String(),
		Usage:    "etherpad for markdown with go",
		Compiled: time.Now(),

		Authors: []*cli.Author{
			{
				Name:  "Thomas Boerger",
				Email: "thomas@webhippie.de",
			},
		},

		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:        "log-level",
				Value:       "info",
				Usage:       "set logging level",
				EnvVars:     []string{"GOPAD_LOG_LEVEL"},
				Destination: &config.LogLevel,
			},
		},

		Commands: []*cli.Command{
			Server(),
			Health(),
		},
	}

	cli.HelpFlag = &cli.BoolFlag{
		Name:    "help",
		Aliases: []string{"h"},
		Usage:   "show the help, so what you see now",
	}

	cli.VersionFlag = &cli.BoolFlag{
		Name:    "version",
		Aliases: []string{"v"},
		Usage:   "print the current version of that tool",
	}

	if err := app.Run(os.Args); err != nil {
		os.Exit(1)
	}
}

func logger() log.Logger {
	logger := log.NewLogfmtLogger(log.NewSyncWriter(os.Stdout))

	switch strings.ToLower(config.LogLevel) {
	case "debug":
		logger = level.NewFilter(logger, level.AllowDebug())
	case "warn":
		logger = level.NewFilter(logger, level.AllowWarn())
	case "error":
		logger = level.NewFilter(logger, level.AllowError())
	default:
		logger = level.NewFilter(logger, level.AllowInfo())
	}

	logger = log.WithPrefix(logger,
		"app", appName,
		"ts", log.DefaultTimestampUTC,
	)

	return logger
}
