package main

import (
	"fmt"
	"net/http"

	"github.com/go-kit/kit/log/level"
	"github.com/gopad/gopad-ui/pkg/config"
	"gopkg.in/urfave/cli.v2"
)

// Health provides the sub-command to perform a health check.
func Health() *cli.Command {
	return &cli.Command{
		Name:  "health",
		Usage: "perform health checks for ui",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:        "ui-addr",
				Value:       defaultAddr,
				Usage:       "address to access the ui",
				EnvVars:     []string{"GOPAD_UI_ADDR"},
				Destination: &config.Server.Addr,
			},
			&cli.StringFlag{
				Name:        "ui-root",
				Value:       "/",
				Usage:       "root folder of the ui",
				EnvVars:     []string{"GOPAD_UI_ROOT"},
				Destination: &config.Server.Root,
			},
		},
		Action: func(c *cli.Context) error {
			logger := logger()

			resp, err := http.Get(
				fmt.Sprintf(
					"http://%s%shealthz",
					config.Server.Addr,
					config.Server.Root,
				),
			)

			if err != nil {
				level.Error(logger).Log(
					"msg", "failed to request health check",
					"err", err,
				)

				return err
			}

			defer resp.Body.Close()

			if resp.StatusCode != 200 {
				level.Error(logger).Log(
					"msg", "health seems to be in a bad state",
					"code", resp.StatusCode,
				)

				return err
			}

			return nil
		},
	}
}
