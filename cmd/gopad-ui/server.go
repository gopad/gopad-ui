package main

import (
	"context"
	"crypto/tls"
	"net"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"path"
	"strings"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/log/level"
	"github.com/oklog/oklog/pkg/group"
	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/handler"
	"github.com/gopad/gopad-ui/pkg/middleware/header"
	"github.com/gopad/gopad-ui/pkg/middleware/requests"
	"golang.org/x/crypto/acme/autocert"
	"gopkg.in/urfave/cli.v2"
)

var (
	defaultAddr = "0.0.0.0:9000"
)

// Server provides the sub-command to start the server.
func Server() *cli.Command {
	return &cli.Command{
		Name:  "server",
		Usage: "start integrated server",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:        "ui-host",
				Value:       "http://localhost:9000",
				Usage:       "external access to ui",
				EnvVars:     []string{"GOPAD_UI_HOST"},
				Destination: &config.Server.Host,
			},
			&cli.StringFlag{
				Name:        "ui-addr",
				Value:       defaultAddr,
				Usage:       "address to bind the ui",
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
			&cli.StringFlag{
				Name:        "static-path",
				Value:       "",
				Usage:       "folder for serving assets",
				EnvVars:     []string{"GOPAD_UI_STATIC"},
				Destination: &config.Server.Static,
			},
			&cli.StringFlag{
				Name:        "storage-path",
				Value:       "storage/",
				Usage:       "folder for storing uploads",
				EnvVars:     []string{"GOPAD_UI_STORAGE"},
				Destination: &config.Server.Storage,
			},
			&cli.BoolFlag{
				Name:        "enable-pprof",
				Value:       false,
				Usage:       "enable pprof debugging server",
				EnvVars:     []string{"GOPAD_UI_PPROF"},
				Destination: &config.Server.Pprof,
			},
			&cli.StringFlag{
				Name:        "ui-cert",
				Value:       "",
				Usage:       "path to ssl cert",
				EnvVars:     []string{"GOPAD_UI_CERT"},
				Destination: &config.Server.Cert,
			},
			&cli.StringFlag{
				Name:        "ui-key",
				Value:       "",
				Usage:       "path to ssl key",
				EnvVars:     []string{"GOPAD_UI_KEY"},
				Destination: &config.Server.Key,
			},
			&cli.BoolFlag{
				Name:        "enable-letsencrypt",
				Value:       false,
				Usage:       "enable let's encrypt ssl",
				EnvVars:     []string{"GOPAD_UI_LETSENCRYPT"},
				Destination: &config.Server.LetsEncrypt,
			},
			&cli.BoolFlag{
				Name:        "strict-curves",
				Value:       false,
				Usage:       "use strict ssl curves",
				EnvVars:     []string{"GOPAD_STRICT_CURVES"},
				Destination: &config.Server.StrictCurves,
			},
			&cli.BoolFlag{
				Name:        "strict-ciphers",
				Value:       false,
				Usage:       "use strict ssl ciphers",
				EnvVars:     []string{"GOPAD_STRICT_CIPHERS"},
				Destination: &config.Server.StrictCiphers,
			},
			&cli.StringFlag{
				Name:        "server-endpoint",
				Value:       "http://localhost:8000",
				Usage:       "url for the api server",
				EnvVars:     []string{"GOPAD_UI_ENDPOINT"},
				Destination: &config.Server.Endpoint,
			},
		},
		Action: func(c *cli.Context) error {
			logger := logger()

			var (
				gr group.Group
			)

			if config.Server.LetsEncrypt || (config.Server.Cert != "" && config.Server.Key != "") {
				cfg, err := ssl(logger)

				if err != nil {
					return err
				}

				if config.Server.LetsEncrypt {
					{
						server := &http.Server{
							Addr:         net.JoinHostPort(addr(), "80"),
							Handler:      redirect(logger),
							ReadTimeout:  5 * time.Second,
							WriteTimeout: 10 * time.Second,
						}

						gr.Add(func() error {
							level.Info(logger).Log(
								"msg", "starting http server",
								"addr", net.JoinHostPort(addr(), "80"),
							)

							return server.ListenAndServe()
						}, func(reason error) {
							ctx, cancel := context.WithTimeout(context.Background(), time.Second)
							defer cancel()

							if err := server.Shutdown(ctx); err != nil {
								level.Error(logger).Log(
									"msg", "failed to shutdown http server gracefully",
									"err", err,
								)

								return
							}

							level.Info(logger).Log(
								"msg", "http server shutdown gracefully",
								"reason", reason,
							)
						})
					}

					{
						server := &http.Server{
							Addr:         net.JoinHostPort(addr(), "443"),
							Handler:      router(logger),
							ReadTimeout:  5 * time.Second,
							WriteTimeout: 10 * time.Second,
							TLSConfig:    cfg,
						}

						gr.Add(func() error {
							level.Info(logger).Log(
								"msg", "starting https server",
								"addr", net.JoinHostPort(addr(), "443"),
							)

							return server.ListenAndServeTLS("", "")
						}, func(reason error) {
							ctx, cancel := context.WithTimeout(context.Background(), time.Second)
							defer cancel()

							if err := server.Shutdown(ctx); err != nil {
								level.Error(logger).Log(
									"msg", "failed to shutdown https server gracefully",
									"err", err,
								)

								return
							}

							level.Info(logger).Log(
								"msg", "https server shutdown gracefully",
								"reason", reason,
							)
						})
					}
				} else {
					{
						server := &http.Server{
							Addr:         config.Server.Addr,
							Handler:      router(logger),
							ReadTimeout:  5 * time.Second,
							WriteTimeout: 10 * time.Second,
							TLSConfig:    cfg,
						}

						gr.Add(func() error {
							level.Info(logger).Log(
								"msg", "starting https server",
								"addr", config.Server.Addr,
							)

							return server.ListenAndServeTLS("", "")
						}, func(reason error) {
							ctx, cancel := context.WithTimeout(context.Background(), time.Second)
							defer cancel()

							if err := server.Shutdown(ctx); err != nil {
								level.Error(logger).Log(
									"msg", "failed to shutdown https server gracefully",
									"err", err,
								)

								return
							}

							level.Info(logger).Log(
								"msg", "https server shutdown gracefully",
								"reason", reason,
							)
						})
					}
				}
			} else {
				{
					server := &http.Server{
						Addr:         config.Server.Addr,
						Handler:      router(logger),
						ReadTimeout:  5 * time.Second,
						WriteTimeout: 10 * time.Second,
					}

					gr.Add(func() error {
						level.Info(logger).Log(
							"msg", "starting http server",
							"addr", config.Server.Addr,
						)

						return server.ListenAndServe()
					}, func(reason error) {
						ctx, cancel := context.WithTimeout(context.Background(), time.Second)
						defer cancel()

						if err := server.Shutdown(ctx); err != nil {
							level.Error(logger).Log(
								"msg", "failed to shutdown http server gracefully",
								"err", err,
							)

							return
						}

						level.Info(logger).Log(
							"msg", "http server shutdown gracefully",
							"reason", reason,
						)
					})
				}
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
		},
	}
}

func addr() string {
	splitAddr := strings.SplitN(
		config.Server.Addr,
		":",
		2,
	)

	return splitAddr[0]
}

func curves() []tls.CurveID {
	if config.Server.StrictCurves {
		return []tls.CurveID{
			tls.CurveP521,
			tls.CurveP384,
			tls.CurveP256,
		}
	}

	return nil
}

func ciphers() []uint16 {
	if config.Server.StrictCiphers {
		return []uint16{
			tls.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
			tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
		}
	}

	return nil
}

func ssl(logger log.Logger) (*tls.Config, error) {
	if config.Server.LetsEncrypt {
		if config.Server.Addr != defaultAddr {
			level.Info(logger).Log(
				"msg", "enabled let's encrypt, overwriting the port",
			)
		}

		parsed, err := url.Parse(
			config.Server.Host,
		)

		if err != nil {
			level.Error(logger).Log(
				"msg", "failed to parse host",
				"err", err,
			)

			return nil, err
		}

		certManager := autocert.Manager{
			Prompt:     autocert.AcceptTOS,
			HostPolicy: autocert.HostWhitelist(parsed.Host),
			Cache:      autocert.DirCache(path.Join(config.Server.Storage, "certs")),
		}

		return &tls.Config{
			PreferServerCipherSuites: true,
			MinVersion:               tls.VersionTLS12,
			CurvePreferences:         curves(),
			CipherSuites:             ciphers(),
			GetCertificate:           certManager.GetCertificate,
		}, nil
	}

	if config.Server.Cert != "" && config.Server.Key != "" {
		cert, err := tls.LoadX509KeyPair(
			config.Server.Cert,
			config.Server.Key,
		)

		if err != nil {
			level.Error(logger).Log(
				"msg", "failed to load certificates",
				"err", err,
			)

			return nil, err
		}

		return &tls.Config{
			PreferServerCipherSuites: true,
			MinVersion:               tls.VersionTLS12,
			CurvePreferences:         curves(),
			CipherSuites:             ciphers(),
			Certificates:             []tls.Certificate{cert},
		}, nil
	}

	return nil, nil
}

func redirect(logger log.Logger) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		target := strings.Join(
			[]string{
				"https://",
				r.Host,
				r.URL.Path,
			},
			"",
		)

		if len(r.URL.RawQuery) > 0 {
			target += "?" + r.URL.RawQuery
		}

		level.Debug(logger).Log(
			"msg", "redirecting to https",
			"target", target,
		)

		http.Redirect(w, r, target, http.StatusPermanentRedirect)
	})
}

func router(logger log.Logger) *chi.Mux {
	mux := chi.NewRouter()

	mux.Use(requests.Requests(logger))

	mux.Use(middleware.Timeout(60 * time.Second))
	mux.Use(middleware.RealIP)

	mux.Use(header.Version)
	mux.Use(header.Cache)
	mux.Use(header.Secure)
	mux.Use(header.Options)

	mux.NotFound(handler.Index(logger))

	mux.Route(config.Server.Root, func(root chi.Router) {
		if config.Server.Pprof {
			root.Mount("/debug", middleware.Profiler())
		}

		root.Handle("/assets/*", handler.Static(logger))
	})

	return mux
}
