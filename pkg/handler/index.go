package handler

import (
	"net/http"

	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/templates"
	"github.com/rs/zerolog/log"
)

// Index renders the general template on all routes.
func Index(cfg *config.Config) http.HandlerFunc {
	logger := log.With().
		Str("handler", "index").
		Logger()

	return func(w http.ResponseWriter, _ *http.Request) {
		if err := templates.Load(
			cfg,
		).ExecuteTemplate(
			w,
			"index.html",
			vars(cfg),
		); err != nil {
			logger.Warn().
				Err(err).
				Msg("Failed to process template")

			http.Error(
				w,
				"Failed to process template",
				http.StatusInternalServerError,
			)
		}
	}
}

func vars(cfg *config.Config) map[string]string {
	return map[string]string{
		"Root":     cfg.Server.Root,
		"Endpoint": cfg.API.Endpoint,
	}
}
