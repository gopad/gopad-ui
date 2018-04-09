package main

import (
	"fmt"
	"net/http"

	"github.com/rs/zerolog/log"
	"github.com/gopad/gopad-ui/pkg/config"
	"gopkg.in/urfave/cli.v2"
)

// Health provides the sub-command to perform a health check.
func Health(cfg *config.Config) *cli.Command {
	return &cli.Command{
		Name:  "health",
		Usage: "perform health checks for ui",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:        "ui-private",
				Value:       privateAddr,
				Usage:       "private address to the ui",
				EnvVars:     []string{"GOPAD_UI_PRIVATE"},
				Destination: &cfg.Server.Private,
			},
		},
		Before: before(cfg),
		Action: health(cfg),
	}
}

func health(cfg *config.Config) cli.ActionFunc {
	return func(c *cli.Context) error {
		resp, err := http.Get(
			fmt.Sprintf(
				"http://%s/healthz",
				cfg.Server.Private,
			),
		)

		if err != nil {
			log.Error().
				Err(err).
				Msg("failed to request health check")

			return err
		}

		defer resp.Body.Close()

		if resp.StatusCode != 200 {
			log.Error().
				Err(err).
				Msg("health seems to be in a bad state")

			return err
		}

		return nil
	}
}
