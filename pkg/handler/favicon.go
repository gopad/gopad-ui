package handler

import (
	"net/http"

	"github.com/gopad/gopad-ui/pkg/assets"
	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/rs/zerolog/log"
)

// Favicon handles the delivery of the favicon.
func Favicon(cfg *config.Config) http.HandlerFunc {
	logger := log.With().
		Str("handler", "favicon").
		Logger()

	return func(w http.ResponseWriter, r *http.Request) {
		file, err := assets.Load(cfg).Open("favicon.ico")

		if err != nil {
			logger.Warn().
				Err(err).
				Msg("Failed to load favicon")

			http.Error(
				w,
				"Failed to load favicon",
				http.StatusInternalServerError,
			)
		}

		stat, err := file.Stat()

		if err != nil {
			logger.Warn().
				Err(err).
				Msg("Failed to stat favicon")

			http.Error(
				w,
				"Failed to stat favicon",
				http.StatusInternalServerError,
			)
		}

		http.ServeContent(
			w,
			r,
			"favicon.ico",
			stat.ModTime(),
			file,
		)
	}
}
