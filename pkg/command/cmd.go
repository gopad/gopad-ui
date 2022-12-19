package command

import (
	"os"

	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/version"
	"github.com/urfave/cli/v2"
)

const (
	defaultMetricsAddr   = "0.0.0.0:8001"
	defaultServerAddress = "0.0.0.0:8081"
)

// Run parses the command line arguments and executes the program.
func Run() error {
	cfg := config.Load()

	app := &cli.App{
		Name:     "gopad-ui",
		Version:  version.String,
		Usage:    "Etherpad for markdown with go",
		Authors:  RootAuthors(cfg),
		Flags:    RootFlags(cfg),
		Before:   RootBefore(cfg),
		Commands: RootCommands(cfg),
	}

	cli.HelpFlag = &cli.BoolFlag{
		Name:    "help",
		Aliases: []string{"h"},
		Usage:   "Show the help",
	}

	cli.VersionFlag = &cli.BoolFlag{
		Name:    "version",
		Aliases: []string{"v"},
		Usage:   "Print the version",
	}

	return app.Run(os.Args)
}

// RootAuthors defines global authors.
func RootAuthors(_ *config.Config) []*cli.Author {
	return []*cli.Author{
		{
			Name:  "Thomas Boerger",
			Email: "thomas@webhippie.de",
		},
	}
}

// RootFlags defines the global flags.
func RootFlags(cfg *config.Config) []cli.Flag {
	return []cli.Flag{
		&cli.StringFlag{
			Name:    "config-file",
			Value:   "",
			Usage:   "Path to config file",
			EnvVars: []string{"GOPAD_UI_CONFIG_FILE"},
		},
		&cli.StringFlag{
			Name:        "log-level",
			Value:       "info",
			Usage:       "Set logging level",
			EnvVars:     []string{"GOPAD_UI_LOG_LEVEL"},
			Destination: &cfg.Logs.Level,
		},
		&cli.BoolFlag{
			Name:        "log-pretty",
			Value:       true,
			Usage:       "Enable pretty logging",
			EnvVars:     []string{"GOPAD_UI_LOG_PRETTY"},
			Destination: &cfg.Logs.Pretty,
		},
		&cli.BoolFlag{
			Name:        "log-color",
			Value:       true,
			Usage:       "Enable colored logging",
			EnvVars:     []string{"GOPAD_UI_LOG_COLOR"},
			Destination: &cfg.Logs.Color,
		},
	}
}

// RootBefore defines global before.
func RootBefore(cfg *config.Config) cli.BeforeFunc {
	return func(c *cli.Context) error {
		return setup(cfg)
	}
}

// RootCommands defines global commands.
func RootCommands(cfg *config.Config) []*cli.Command {
	return []*cli.Command{
		Gen(cfg),
		Health(cfg),
		Server(cfg),
	}
}
