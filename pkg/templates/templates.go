package templates

import (
	"html/template"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"github.com/rs/zerolog/log"
	"github.com/gopad/gopad-ui/pkg/assets"
	"github.com/gopad/gopad-ui/pkg/config"
	// "github.com/Masterminds/sprig"
)

// Load loads the template to make it parseable.
func Load(cfg *config.Config) *template.Template {
	tpls := template.New(
		"",
	).Funcs(
		Funcs(),
	)

	files, err := assets.WalkDirs(
		"",
		false,
	)

	if err != nil {
		log.Warn().
			Err(err).
			Msg("failed to get builtin template list")
	} else {
		for _, name := range files {
			if !strings.HasSuffix(name, ".html") {
				continue
			}

			file, err := assets.ReadFile(name)

			if err != nil {
				log.Warn().
					Err(err).
					Str("file", name).
					Msg("failed to read builtin template")
			}

			if _, err := tpls.New(name).Parse(string(file)); err != nil {
				log.Warn().
					Err(err).
					Str("file", name).
					Msg("failed to parse builtin template")
			}
		}
	}

	if cfg.Server.Static != "" {
		if stat, err := os.Stat(cfg.Server.Static); err == nil && stat.IsDir() {
			files := []string{}

			filepath.Walk(cfg.Server.Static, func(path string, f os.FileInfo, err error) error {
				if f.IsDir() {
					return nil
				}

				if !strings.HasSuffix(path, ".html") {
					return nil
				}

				files = append(
					files,
					path,
				)

				return nil
			})

			for _, name := range files {
				file, err := ioutil.ReadFile(name)

				if err != nil {
					log.Warn().
						Err(err).
						Str("file", name).
						Msg("failed to read custom template")
				}

				tplName := strings.TrimPrefix(
					strings.TrimPrefix(
						name,
						cfg.Server.Static,
					),
					"/",
				)

				if _, err := tpls.New(tplName).Parse(string(file)); err != nil {
					log.Warn().
						Err(err).
						Str("file", name).
						Msg("failed to parse custom template")
				}
			}
		} else {
			log.Warn().
				Msg("custom assets directory doesn't exist")
		}
	}

	return tpls
}

// Funcs provides some general usefule template helpers.
func Funcs() template.FuncMap {
	return template.FuncMap{} // sprig.FuncMap()
}
