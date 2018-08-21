package main

import (
	"context"
	"io"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/handler"
	"github.com/gopad/gopad-ui/pkg/middleware/header"
	"github.com/gopad/gopad-ui/pkg/middleware/prometheus"
	"github.com/oklog/run"
	"github.com/rs/zerolog/hlog"
	"github.com/rs/zerolog/log"
	"gopkg.in/urfave/cli.v2"
)

// Server provides the sub-command to start the server.
func Server(cfg *config.Config) *cli.Command {
	return &cli.Command{
		Name:   "server",
		Usage:  "start integrated server",
		Flags:  serverFlags(cfg),
		Before: serverBefore(cfg),
		Action: serverAction(cfg),
	}
}

func serverFlags(cfg *config.Config) []cli.Flag {
	return []cli.Flag{
		&cli.StringFlag{
			Name:        "metrics-addr",
			Value:       "0.0.0.0:8090",
			Usage:       "address to bind the metrics",
			EnvVars:     []string{"GOPAD_UI_METRICS_ADDR"},
			Destination: &cfg.Metrics.Addr,
		},
		&cli.StringFlag{
			Name:        "metrics-token",
			Value:       "",
			Usage:       "token to make metrics secure",
			EnvVars:     []string{"GOPAD_UI_METRICS_TOKEN"},
			Destination: &cfg.Metrics.Token,
		},
		&cli.StringFlag{
			Name:        "ui-addr",
			Value:       "0.0.0.0:8080",
			Usage:       "address to bind the ui",
			EnvVars:     []string{"GOPAD_UI_SERVER_ADDR"},
			Destination: &cfg.Server.Addr,
		},
		&cli.BoolFlag{
			Name:        "ui-pprof",
			Value:       false,
			Usage:       "enable pprof debugging",
			EnvVars:     []string{"GOPAD_UI_SERVER_PPROF"},
			Destination: &cfg.Server.Pprof,
		},
		&cli.StringFlag{
			Name:        "ui-host",
			Value:       "http://localhost:8080",
			Usage:       "external access to ui",
			EnvVars:     []string{"GOPAD_UI_SERVER_HOST"},
			Destination: &cfg.Server.Host,
		},
		&cli.StringFlag{
			Name:        "ui-root",
			Value:       "/",
			Usage:       "path to access the ui",
			EnvVars:     []string{"GOPAD_UI_SERVER_ROOT"},
			Destination: &cfg.Server.Root,
		},
		&cli.StringFlag{
			Name:        "static-path",
			Value:       "",
			Usage:       "folder for serving assets",
			EnvVars:     []string{"GOPAD_UI_STATIC_PATH"},
			Destination: &cfg.Server.Static,
		},
		&cli.StringFlag{
			Name:        "api-endpoint",
			Value:       "http://localhost:8000",
			Usage:       "url for the api server",
			EnvVars:     []string{"GOPAD_UI_API_ENDPOINT"},
			Destination: &cfg.API.Endpoint,
		},
	}
}

func serverBefore(cfg *config.Config) cli.BeforeFunc {
	return func(c *cli.Context) error {
		setupLogger(cfg)
		return nil
	}
}

func serverAction(cfg *config.Config) cli.ActionFunc {
	return func(c *cli.Context) error {
		var gr run.Group

		{
			server := &http.Server{
				Addr:         cfg.Server.Addr,
				Handler:      router(cfg),
				ReadTimeout:  5 * time.Second,
				WriteTimeout: 10 * time.Second,
			}

			gr.Add(func() error {
				log.Info().
					Str("addr", cfg.Server.Addr).
					Msg("starting http server")

				return server.ListenAndServe()
			}, func(reason error) {
				ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
				defer cancel()

				if err := server.Shutdown(ctx); err != nil {
					log.Error().
						Err(err).
						Msg("failed to shutdown http gracefully")

					return
				}

				log.Info().
					Err(reason).
					Msg("http shutdown gracefully")
			})
		}

		{
			server := &http.Server{
				Addr:         cfg.Metrics.Addr,
				Handler:      metrics(cfg),
				ReadTimeout:  5 * time.Second,
				WriteTimeout: 10 * time.Second,
			}

			gr.Add(func() error {
				log.Info().
					Str("addr", cfg.Metrics.Addr).
					Msg("starting metrics server")

				return server.ListenAndServe()
			}, func(reason error) {
				ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
				defer cancel()

				if err := server.Shutdown(ctx); err != nil {
					log.Error().
						Err(err).
						Msg("failed to shutdown metrics gracefully")

					return
				}

				log.Info().
					Err(reason).
					Msg("metrics shutdown gracefully")
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

func router(cfg *config.Config) *chi.Mux {
	mux := chi.NewRouter()

	mux.Use(hlog.NewHandler(log.Logger))
	mux.Use(hlog.RemoteAddrHandler("ip"))
	mux.Use(hlog.URLHandler("path"))
	mux.Use(hlog.MethodHandler("method"))
	mux.Use(hlog.RequestIDHandler("request_id", "Request-Id"))

	mux.Use(hlog.AccessHandler(func(r *http.Request, status, size int, duration time.Duration) {
		hlog.FromRequest(r).Debug().
			Str("method", r.Method).
			Str("url", r.URL.String()).
			Int("status", status).
			Int("size", size).
			Dur("duration", duration).
			Msg("")
	}))

	mux.Use(middleware.RealIP)
	mux.Use(header.Version)
	mux.Use(header.Cache)
	mux.Use(header.Secure)
	mux.Use(header.Options)

	mux.NotFound(handler.Index(cfg))

	mux.Route(cfg.Server.Root, func(root chi.Router) {
		if cfg.Server.Pprof {
			root.Mount("/debug", middleware.Profiler())
		}

		root.Handle("/assets/*", handler.Static(cfg))
	})

	return mux
}

func metrics(cfg *config.Config) *chi.Mux {
	mux := chi.NewRouter()

	mux.Use(hlog.NewHandler(log.Logger))
	mux.Use(hlog.RemoteAddrHandler("ip"))
	mux.Use(hlog.URLHandler("path"))
	mux.Use(hlog.MethodHandler("method"))
	mux.Use(hlog.RequestIDHandler("request_id", "Request-Id"))

	mux.Use(middleware.RealIP)
	mux.Use(header.Version)
	mux.Use(header.Cache)
	mux.Use(header.Secure)
	mux.Use(header.Options)

	mux.Route("/", func(root chi.Router) {
		root.Get("/metrics", prometheus.Handler(cfg.Metrics.Token))

		root.Get("/healthz", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "text/plain")
			w.WriteHeader(http.StatusOK)

			io.WriteString(w, http.StatusText(http.StatusOK))
		})

		root.Get("/readyz", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "text/plain")
			w.WriteHeader(http.StatusOK)

			io.WriteString(w, http.StatusText(http.StatusOK))
		})
	})

	return mux
}
