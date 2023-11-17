package router

import (
	"io"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/handler"
	"github.com/gopad/gopad-ui/pkg/metrics"
	"github.com/gopad/gopad-ui/pkg/middleware/header"
	"github.com/gopad/gopad-ui/pkg/middleware/prometheus"
	"github.com/gopad/gopad-ui/pkg/middleware/requestid"
	"github.com/rs/zerolog/hlog"
	"github.com/rs/zerolog/log"
)

// Server initializes the routing of the server.
func Server(
	cfg *config.Config,
) *chi.Mux {
	mux := chi.NewRouter()
	mux.Use(middleware.Timeout(60 * time.Second))
	mux.Use(requestid.Handler)
	mux.Use(middleware.RealIP)
	mux.Use(header.Version)
	mux.Use(header.Cache)
	mux.Use(header.Secure)
	mux.Use(header.Options)

	mux.Use(hlog.NewHandler(log.Logger))
	mux.Use(hlog.RemoteAddrHandler("ip"))
	mux.Use(hlog.URLHandler("path"))
	mux.Use(hlog.MethodHandler("method"))

	mux.Use(hlog.AccessHandler(func(r *http.Request, status, size int, duration time.Duration) {
		hlog.FromRequest(r).Debug().
			Str("request", requestid.Get(r.Context())).
			Str("method", r.Method).
			Int("status", status).
			Int("size", size).
			Dur("duration", duration).
			Msg("")
	}))

	mux.NotFound(handler.Index(cfg))

	mux.Route(cfg.Server.Root, func(root chi.Router) {
		mux.Get("/favicon.ico", handler.Favicon(cfg))
		mux.Get("/manifest.json", handler.Manifest(cfg))
		mux.Get("/.vite/manifest.json", handler.Manifest(cfg))

		root.Handle("/assets/*", handler.Static(
			cfg,
		))
	})

	return mux
}

// Metrics initializes the routing of metrics and health.
func Metrics(
	cfg *config.Config,
	metricz *metrics.Metrics,
) *chi.Mux {
	mux := chi.NewRouter()
	mux.Use(middleware.Timeout(60 * time.Second))

	mux.Route("/", func(root chi.Router) {
		root.Get("/metrics", prometheus.Handler(metricz.Registry, cfg.Metrics.Token))

		if cfg.Metrics.Pprof {
			root.Mount("/debug", middleware.Profiler())
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
