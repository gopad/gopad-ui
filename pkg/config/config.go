package config

import (
	"encoding/base64"
	"fmt"
	"os"
	"strings"
)

// Logs defines the level and color for log configuration.
type Logs struct {
	Level  string `mapstructure:"level"`
	Pretty bool   `mapstructure:"pretty"`
	Color  bool   `mapstructure:"color"`
}

// Server defines the webserver configuration.
type Server struct {
	Host   string `mapstructure:"host"`
	Root   string `mapstructure:"root"`
	Addr   string `mapstructure:"addr"`
	Cert   string `mapstructure:"cert"`
	Key    string `mapstructure:"key"`
	Assets string `mapstructure:"assets"`
}

// Metrics defines the metrics server configuration.
type Metrics struct {
	Addr  string `mapstructure:"addr"`
	Token string `mapstructure:"token"`
	Pprof bool   `mapstructure:"pprof"`
}

// API defines the api server configuration.
type API struct {
	Endpoint string `mapstructure:"endpoint"`
}

// Config is a combination of all available configurations.
type Config struct {
	File    string  `mapstructure:"-"`
	Logs    Logs    `mapstructure:"logs"`
	Server  Server  `mapstructure:"server"`
	Metrics Metrics `mapstructure:"metrics"`
	API     API     `mapstructure:"api"`
}

// Load initializes a default configuration struct.
func Load() *Config {
	return &Config{}
}

// Value returns the config value based on a DSN.
func Value(val string) (string, error) {
	if strings.HasPrefix(val, "file://") {
		content, err := os.ReadFile(
			strings.TrimPrefix(val, "file://"),
		)

		if err != nil {
			return "", fmt.Errorf("failed to parse secret file: %w", err)
		}

		return string(content), nil
	}

	if strings.HasPrefix(val, "base64://") {
		content, err := base64.StdEncoding.DecodeString(
			strings.TrimPrefix(val, "base64://"),
		)

		if err != nil {
			return "", fmt.Errorf("failed to parse base64 value: %w", err)
		}

		return string(content), nil
	}

	return val, nil
}
