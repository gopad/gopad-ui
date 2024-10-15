package handler

import (
	"encoding/json"
	"net/http"

	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/rs/zerolog/log"
)

// FrontendConfig defines the configuration handed over to frontend.
type FrontendConfig struct {
	Endpoint string `json:"apiEndpoint"`
}

// Config renders the general template on all routes.
func Config(cfg *config.Config) http.HandlerFunc {
	logger := log.With().
		Str("handler", "config").
		Logger()

	return func(w http.ResponseWriter, _ *http.Request) {
		result, err := json.MarshalIndent(
			&FrontendConfig{
				Endpoint: cfg.API.Endpoint,
			},
			"",
			"  ",
		)

		if err != nil {
			logger.Warn().
				Err(err).
				Msg("Failed to generate config")

			http.Error(
				w,
				"Failed to generate config",
				http.StatusInternalServerError,
			)
		}

		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write(result)
	}
}
