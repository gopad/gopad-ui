package main

import (
	"os"
	"strings"
	"time"

	"github.com/rs/zerolog/log"
	"github.com/rs/zerolog"
	"github.com/joho/godotenv"
	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/version"
	"gopkg.in/urfave/cli.v2"
)

func main() {
	cfg := config.New()

	if env := os.Getenv("GOPAD_ENV_FILE"); env != "" {
		godotenv.Load(env)
	}

	app := &cli.App{
		Name:     "gopad-ui",
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
				Destination: &cfg.Logs.Level,
			},
			&cli.BoolFlag{
				Name:        "log-colored",
				Value:       false,
				Usage:       "enable colored logging",
				EnvVars:     []string{"KLEISTER_LOG_COLORED"},
				Destination: &cfg.Logs.Colored,
			},
			&cli.BoolFlag{
				Name:        "log-pretty",
				Value:       false,
				Usage:       "enable pretty logging",
				EnvVars:     []string{"KLEISTER_LOG_PRETTY"},
				Destination: &cfg.Logs.Pretty,
			},
		},

		Commands: []*cli.Command{
			Server(cfg),
			Health(cfg),
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

func setupLogger(cfg *config.Config) {
	switch strings.ToLower(cfg.Logs.Level) {
	case "debug":
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	case "info":
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	case "warn":
		zerolog.SetGlobalLevel(zerolog.WarnLevel)
	case "error":
		zerolog.SetGlobalLevel(zerolog.ErrorLevel)
	case "fatal":
		zerolog.SetGlobalLevel(zerolog.FatalLevel)
	case "panic":
		zerolog.SetGlobalLevel(zerolog.PanicLevel)
	default:
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	}

	if cfg.Logs.Pretty {
		log.Logger = log.Output(
			zerolog.ConsoleWriter{
				Out:     os.Stderr,
				NoColor: !cfg.Logs.Colored,
			},
		)
	}
}
