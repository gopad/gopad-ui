package handler

import (
	"net/http"

	"github.com/gopad/gopad-ui/pkg/assets"
	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/rs/zerolog/log"
)

// Manifest handles the delivery of the manifest.
func Manifest(cfg *config.Config) http.HandlerFunc {
	logger := log.With().
		Str("handler", "manifest").
		Logger()

	return func(w http.ResponseWriter, r *http.Request) {
		file, err := assets.Load(cfg).Open("manifest.json")

		if err != nil {
			logger.Warn().
				Err(err).
				Msg("Failed to load manifest")

			http.Error(
				w,
				"Failed to load manifest",
				http.StatusInternalServerError,
			)
		}

		stat, err := file.Stat()

		if err != nil {
			logger.Warn().
				Err(err).
				Msg("Failed to stat manifest")

			http.Error(
				w,
				"Failed to stat manifest",
				http.StatusInternalServerError,
			)
		}

		http.ServeContent(
			w,
			r,
			"manifest.json",
			stat.ModTime(),
			file,
		)
	}
}
