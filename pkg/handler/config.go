package handler

import (
	"net/http"

	"github.com/go-chi/render"
)

// FrontendConfig defines the configuration handed over to frontend.
type FrontendConfig struct {
	Endpoint string `json:"apiEndpoint"`
}

// Config renders the config for the embedded frontend.
func (h *Handler) Config() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		render.Status(r, http.StatusOK)
		render.JSON(w, r, &FrontendConfig{
			Endpoint: h.config.API.Endpoint,
		})
	}
}
