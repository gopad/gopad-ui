package command

import (
	"os"
	"strings"

	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
)

func setup(cfg *config.Config) error {
	if err := setupLogger(cfg); err != nil {
		return err
	}

	return setupConfig(cfg)
}

func setupLogger(cfg *config.Config) error {
	switch strings.ToLower(cfg.Logs.Level) {
	case "panic":
		zerolog.SetGlobalLevel(zerolog.PanicLevel)
	case "fatal":
		zerolog.SetGlobalLevel(zerolog.FatalLevel)
	case "error":
		zerolog.SetGlobalLevel(zerolog.ErrorLevel)
	case "warn":
		zerolog.SetGlobalLevel(zerolog.WarnLevel)
	case "info":
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	case "debug":
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	case "trace":
		zerolog.SetGlobalLevel(zerolog.TraceLevel)
	default:
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	}

	if cfg.Logs.Pretty {
		log.Logger = log.Output(
			zerolog.ConsoleWriter{
				Out:     os.Stderr,
				NoColor: !cfg.Logs.Color,
			},
		)
	}

	return nil
}

func setupConfig(cfg *config.Config) error {
	if cfg.File != "" {
		viper.SetConfigFile(cfg.File)
	} else {
		viper.SetConfigName("ui")

		viper.AddConfigPath("/etc/gopad")
		viper.AddConfigPath("$HOME/.gopad")
		viper.AddConfigPath("./config")
	}

	if err := viper.ReadInConfig(); err != nil {
		switch err.(type) {
		case viper.ConfigFileNotFoundError:
			log.Info().
				Msg("Continue without config")
		case viper.UnsupportedConfigError:
			log.Fatal().
				Err(err).
				Msg("Unsupported config type")

			return err
		default:
			log.Fatal().
				Err(err).
				Msg("Failed to read config")

			return err
		}
	}

	if err := viper.Unmarshal(&cfg); err != nil {
		log.Fatal().
			Err(err).
			Msg("Failed to parse config")

		return err
	}

	return nil
}
