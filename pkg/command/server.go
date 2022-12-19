package command

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/metrics"
	"github.com/gopad/gopad-ui/pkg/router"
	"github.com/oklog/run"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

// Server provides the sub-command to start the server.
func Server(cfg *config.Config) *cli.Command {
	return &cli.Command{
		Name:   "server",
		Usage:  "Start integrated server",
		Flags:  ServerFlags(cfg),
		Action: ServerAction(cfg),
	}
}

// ServerFlags defines server flags.
func ServerFlags(cfg *config.Config) []cli.Flag {
	return []cli.Flag{
		&cli.BoolFlag{
			Name:        "debug-pprof",
			Value:       false,
			Usage:       "Enable pprof debugging",
			EnvVars:     []string{"GOPAD_UI_DEBUG_PPROF"},
			Destination: &cfg.Metrics.Pprof,
		},
		&cli.StringFlag{
			Name:        "metrics-addr",
			Value:       defaultMetricsAddr,
			Usage:       "Address to bind the metrics",
			EnvVars:     []string{"GOPAD_UI_METRICS_ADDR"},
			Destination: &cfg.Metrics.Addr,
		},
		&cli.StringFlag{
			Name:        "metrics-token",
			Value:       "",
			Usage:       "Token to make metrics secure",
			EnvVars:     []string{"GOPAD_UI_METRICS_TOKEN"},
			Destination: &cfg.Metrics.Token,
			FilePath:    "/etc/gopad/secrets/metrics-token",
		},
		&cli.StringFlag{
			Name:        "server-addr",
			Value:       defaultServerAddress,
			Usage:       "Address to bind the UI",
			EnvVars:     []string{"GOPAD_UI_SERVER_ADDR"},
			Destination: &cfg.Server.Addr,
		},
		&cli.StringFlag{
			Name:        "server-host",
			Value:       "http://localhost:8080",
			Usage:       "External access to UI",
			EnvVars:     []string{"GOPAD_UI_SERVER_HOST"},
			Destination: &cfg.Server.Host,
		},
		&cli.StringFlag{
			Name:        "server-root",
			Value:       "/",
			Usage:       "Path to access the UI",
			EnvVars:     []string{"GOPAD_UI_SERVER_ROOT"},
			Destination: &cfg.Server.Root,
		},
		&cli.StringFlag{
			Name:        "server-cert",
			Value:       "",
			Usage:       "Path to SSL cert",
			EnvVars:     []string{"GOPAD_UI_SERVER_CERT"},
			Destination: &cfg.Server.Cert,
		},
		&cli.StringFlag{
			Name:        "server-key",
			Value:       "",
			Usage:       "Path to SSL key",
			EnvVars:     []string{"GOPAD_UI_SERVER_KEY"},
			Destination: &cfg.Server.Key,
		},
		&cli.StringFlag{
			Name:        "static-path",
			Value:       "",
			Usage:       "Folder for serving assets",
			EnvVars:     []string{"GOPAD_UI_STATIC_PATH"},
			Destination: &cfg.Server.Static,
		},
		&cli.StringFlag{
			Name:        "api-endpoint",
			Value:       "http://localhost:8000",
			Usage:       "URL for the api server",
			EnvVars:     []string{"GOPAD_UI_API_ENDPOINT"},
			Destination: &cfg.API.Endpoint,
		},
	}
}

// ServerAction defines server action.
func ServerAction(cfg *config.Config) cli.ActionFunc {
	return func(c *cli.Context) error {
		metricz := metrics.New()
		gr := run.Group{}

		{
			routing := router.Server(
				cfg,
			)

			server := &http.Server{
				Addr: cfg.Server.Addr,
				Handler: h2c.NewHandler(
					routing,
					&http2.Server{},
				),
				ReadTimeout:  5 * time.Second,
				WriteTimeout: 10 * time.Second,
			}

			gr.Add(func() error {
				log.Info().
					Str("addr", cfg.Server.Addr).
					Msg("Starting HTTP server")

				if cfg.Server.Cert != "" && cfg.Server.Key != "" {
					return server.ListenAndServeTLS(
						cfg.Server.Cert,
						cfg.Server.Key,
					)
				}

				return server.ListenAndServe()
			}, func(reason error) {
				ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
				defer cancel()

				if err := server.Shutdown(ctx); err != nil {
					log.Error().
						Err(err).
						Msg("Failed to shutdown HTTP gracefully")

					return
				}

				log.Info().
					Err(reason).
					Msg("HTTP shutdown gracefully")
			})
		}

		{
			routing := router.Metrics(
				cfg,
				metricz,
			)

			server := &http.Server{
				Addr: cfg.Metrics.Addr,
				Handler: h2c.NewHandler(
					routing,
					&http2.Server{},
				),
				ReadTimeout:  5 * time.Second,
				WriteTimeout: 10 * time.Second,
			}

			gr.Add(func() error {
				log.Info().
					Str("addr", cfg.Metrics.Addr).
					Msg("Starting metrics server")

				return server.ListenAndServe()
			}, func(reason error) {
				ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
				defer cancel()

				if err := server.Shutdown(ctx); err != nil {
					log.Error().
						Err(err).
						Msg("Failed to shutdown metrics gracefully")

					return
				}

				log.Info().
					Err(reason).
					Msg("Metrics shutdown gracefully")
			})
		}

		{
			stop := make(chan os.Signal, 1)

			gr.Add(func() error {
				signal.Notify(stop, os.Interrupt)

				<-stop

				return nil
			}, func(err error) {
				close(stop)
			})
		}

		return gr.Run()
	}
}
