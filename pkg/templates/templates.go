package templates

import (
	"html/template"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/log/level"
	"github.com/gopad/gopad-ui/pkg/assets"
	"github.com/gopad/gopad-ui/pkg/config"
)

// Load loads the template to make it parseable.
func Load(logger log.Logger) *template.Template {
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
		level.Warn(logger).Log(
			"msg", "failed to get builtin template list",
			"err", err,
		)
	} else {
		for _, name := range files {
			if !strings.HasSuffix(name, ".html") {
				continue
			}

			file, readErr := assets.ReadFile(name)

			if readErr != nil {
				level.Warn(logger).Log(
					"msg", "failed to read builtin template",
					"err", readErr,
					"file", name,
				)
			}

			_, parseErr := tpls.New(
				name,
			).Parse(
				string(file),
			)

			if parseErr != nil {
				level.Warn(logger).Log(
					"msg", "failed to parse builtin template",
					"err", parseErr,
					"file", name,
				)
			}
		}
	}

	if config.Server.Static != "" {
		if stat, err := os.Stat(config.Server.Static); err == nil && stat.IsDir() {
			files := []string{}

			filepath.Walk(config.Server.Static, func(path string, f os.FileInfo, err error) error {
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
				file, readErr := ioutil.ReadFile(name)

				if readErr != nil {
					level.Warn(logger).Log(
						"msg", "failed to read custom template",
						"err", readErr,
						"file", name,
					)
				}

				_, parseErr := tpls.New(
					strings.TrimPrefix(
						strings.TrimPrefix(
							name,
							config.Server.Static,
						),
						"/",
					),
				).Parse(
					string(file),
				)

				if parseErr != nil {
					level.Warn(logger).Log(
						"msg", "failed to parse custom template",
						"err", parseErr,
						"file", name,
					)
				}
			}
		} else {
			level.Warn(logger).Log(
				"msg", "custom assets directory doesn't exist",
			)
		}
	}

	return tpls
}

// Funcs provides some general usefule template helpers.
func Funcs() template.FuncMap {
	return template.FuncMap{
		"split":    strings.Split,
		"join":     strings.Join,
		"toUpper":  strings.ToUpper,
		"toLower":  strings.ToLower,
		"contains": strings.Contains,
		"replace":  strings.Replace,
	}
}
