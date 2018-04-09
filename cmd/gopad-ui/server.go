package main

import (
	"context"
	"crypto/tls"
	"net/http"
	"os"
	"os/signal"
	"time"
	"io"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rs/zerolog/log"
	"github.com/rs/zerolog/hlog"
	"github.com/oklog/run"
	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/handler"
	"github.com/gopad/gopad-ui/pkg/middleware/header"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"gopkg.in/urfave/cli.v2"
)

var (
	defaultAddr = "0.0.0.0:9000"
	privateAddr = "127.0.0.1:9001"
)

// Server provides the sub-command to start the server.
func Server(cfg *config.Config) *cli.Command {
	return &cli.Command{
		Name:  "server",
		Usage: "start integrated server",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:        "ui-host",
				Value:       "http://localhost:9000",
				Usage:       "external access to ui",
				EnvVars:     []string{"GOPAD_UI_HOST"},
				Destination: &cfg.Server.Host,
			},
			&cli.StringFlag{
				Name:        "ui-private",
				Value:       privateAddr,
				Usage:       "private addess to the ui",
				EnvVars:     []string{"GOPAD_UI_PRIVATE"},
				Destination: &cfg.Server.Private,
			},
			&cli.StringFlag{
				Name:        "ui-public",
				Value:       defaultAddr,
				Usage:       "public addess to the ui",
				EnvVars:     []string{"GOPAD_UI_PUBLIC"},
				Destination: &cfg.Server.Public,
			},
			&cli.StringFlag{
				Name:        "ui-root",
				Value:       "/",
				Usage:       "root folder of the ui",
				EnvVars:     []string{"GOPAD_UI_ROOT"},
				Destination: &cfg.Server.Root,
			},
			&cli.StringFlag{
				Name:        "static-path",
				Value:       "",
				Usage:       "folder for serving assets",
				EnvVars:     []string{"GOPAD_UI_STATIC"},
				Destination: &cfg.Server.Static,
			},
			&cli.StringFlag{
				Name:        "storage-path",
				Value:       "storage/",
				Usage:       "folder for storing uploads",
				EnvVars:     []string{"GOPAD_UI_STORAGE"},
				Destination: &cfg.Server.Storage,
			},
			&cli.BoolFlag{
				Name:        "enable-pprof",
				Value:       false,
				Usage:       "enable pprof debugging server",
				EnvVars:     []string{"GOPAD_UI_PPROF"},
				Destination: &cfg.Server.Pprof,
			},
			&cli.BoolFlag{
				Name:        "enable-prometheus",
				Value:       false,
				Usage:       "enable prometheus endpoint",
				EnvVars:     []string{"GOPAD_UI_PROMETHEUS"},
				Destination: &cfg.Server.Prometheus,
			},
			&cli.StringFlag{
				Name:        "ui-cert",
				Value:       "",
				Usage:       "path to ssl cert",
				EnvVars:     []string{"GOPAD_UI_CERT"},
				Destination: &cfg.Server.Cert,
			},
			&cli.StringFlag{
				Name:        "ui-key",
				Value:       "",
				Usage:       "path to ssl key",
				EnvVars:     []string{"GOPAD_UI_KEY"},
				Destination: &cfg.Server.Key,
			},
			&cli.BoolFlag{
				Name:        "strict-curves",
				Value:       false,
				Usage:       "use strict ssl curves",
				EnvVars:     []string{"GOPAD_STRICT_CURVES"},
				Destination: &cfg.Server.StrictCurves,
			},
			&cli.BoolFlag{
				Name:        "strict-ciphers",
				Value:       false,
				Usage:       "use strict ssl ciphers",
				EnvVars:     []string{"GOPAD_STRICT_CIPHERS"},
				Destination: &cfg.Server.StrictCiphers,
			},
			&cli.StringFlag{
				Name:        "server-endpoint",
				Value:       "http://localhost:8000",
				Usage:       "url for the api server",
				EnvVars:     []string{"GOPAD_UI_ENDPOINT"},
				Destination: &cfg.Server.Endpoint,
			},
		},
		Before: before(cfg),
		Action: server(cfg),
	}
}

func before(cfg *config.Config) cli.BeforeFunc {
	return func(c *cli.Context) error {
		setupLogger(cfg)
		return nil
	}
}

func server(cfg *config.Config) cli.ActionFunc {
	return func(c *cli.Context) error {
		var gr run.Group

		if cfg.Server.Cert != "" && cfg.Server.Key != "" {
			cert, err := tls.LoadX509KeyPair(
				cfg.Server.Cert,
				cfg.Server.Key,
			)

			if err != nil {
				log.Error().
					Err(err).
					Msg("failed to load certificates")

				return err
			}

			{
				server := &http.Server{
					Addr:         cfg.Server.Public,
					Handler:      router(cfg),
					ReadTimeout:  5 * time.Second,
					WriteTimeout: 10 * time.Second,
					TLSConfig:    &tls.Config{
						PreferServerCipherSuites: true,
						MinVersion:               tls.VersionTLS12,
						CurvePreferences:         curves(cfg),
						CipherSuites:             ciphers(cfg),
						Certificates:             []tls.Certificate{cert},
					},
				}

				gr.Add(func() error {
					log.Info().
						Str("addr", cfg.Server.Public).
						Msg("starting https server")

					return server.ListenAndServeTLS("", "")
				}, func(reason error) {
					ctx, cancel := context.WithTimeout(context.Background(), time.Second)
					defer cancel()

					if err := server.Shutdown(ctx); err != nil {
						log.Error().
							Err(err).
							Msg("failed to shutdown https server gracefully")

						return
					}

					log.Info().
						Err(reason).
						Msg("https server shutdown gracefully")
				})
			}
		} else {
			{
				server := &http.Server{
					Addr:         cfg.Server.Public,
					Handler:      router(cfg),
					ReadTimeout:  5 * time.Second,
					WriteTimeout: 10 * time.Second,
				}

				gr.Add(func() error {
					log.Info().
						Str("addr", cfg.Server.Public).
						Msg("starting http server")

					return server.ListenAndServe()
				}, func(reason error) {
					ctx, cancel := context.WithTimeout(context.Background(), time.Second)
					defer cancel()

					if err := server.Shutdown(ctx); err != nil {
						log.Error().
							Err(err).
							Msg("failed to shutdown http server gracefully")

						return
					}

					log.Info().
						Err(reason).
						Msg("http server shutdown gracefully")
				})
			}
		}

		{
			server := &http.Server{
				Addr:         cfg.Server.Private,
				Handler:      status(cfg),
				ReadTimeout:  5 * time.Second,
				WriteTimeout: 10 * time.Second,
			}

			gr.Add(func() error {
				log.Info().
					Str("addr", cfg.Server.Private).
					Msg("starting status server")

				return server.ListenAndServe()
			}, func(reason error) {
				ctx, cancel := context.WithTimeout(context.Background(), time.Second)
				defer cancel()

				if err := server.Shutdown(ctx); err != nil {
					log.Error().
						Err(err).
						Msg("failed to shutdown status server gracefully")

					return
				}

				log.Info().
					Err(reason).
					Msg("status server shutdown gracefully")
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

	mux.Use(middleware.Timeout(60 * time.Second))
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

func status(cfg *config.Config) *chi.Mux {
	mux := chi.NewRouter()

	mux.Use(hlog.NewHandler(log.Logger))
	mux.Use(hlog.RemoteAddrHandler("ip"))
	mux.Use(hlog.URLHandler("path"))
	mux.Use(hlog.MethodHandler("method"))
	mux.Use(hlog.RequestIDHandler("request_id", "Request-Id"))

	mux.Use(middleware.Timeout(60 * time.Second))
	mux.Use(middleware.RealIP)

	mux.Use(header.Version)
	mux.Use(header.Cache)
	mux.Use(header.Secure)
	mux.Use(header.Options)

	mux.Route("/", func(root chi.Router) {
		if cfg.Server.Prometheus {
			root.Mount("/metrics", promhttp.Handler())
		}

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

func curves(cfg *config.Config) []tls.CurveID {
	if cfg.Server.StrictCurves {
		return []tls.CurveID{
			tls.CurveP521,
			tls.CurveP384,
			tls.CurveP256,
		}
	}

	return nil
}

func ciphers(cfg *config.Config) []uint16 {
	if cfg.Server.StrictCiphers {
		return []uint16{
			tls.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
			tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
		}
	}

	return nil
}
