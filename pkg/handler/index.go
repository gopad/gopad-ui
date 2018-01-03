package handler

import (
	"net/http"

	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/log/level"
	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/fail"
	"github.com/gopad/gopad-ui/pkg/templates"
)

// Index renders the general template on all routes.
func Index(logger log.Logger) http.HandlerFunc {
	logger = log.WithPrefix(logger, "handler", "index")

	return func(w http.ResponseWriter, r *http.Request) {
		if err := templates.Load(logger).ExecuteTemplate(w, "index.html", vars()); err != nil {
			level.Warn(logger).Log(
				"msg", "failed to process index template",
				"err", err,
			)

			fail.ErrorPlain(w, fail.Cause(err).Unexpected())
			return
		}
	}
}

func vars() map[string]string {
	return map[string]string{
		"Root":     config.Server.Root,
		"Endpoint": config.Server.Endpoint,
	}
}
