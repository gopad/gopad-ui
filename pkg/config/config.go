package config

// Server defines the server configuration.
type Server struct {
	Host          string
	Private          string
	Public          string
	Cert          string
	Key           string
	Root          string
	Static        string
	Storage       string
	StrictCurves  bool
	StrictCiphers bool
	Prometheus   bool
	Pprof         bool
	Endpoint      string
}

// Logs defines the logging configuration.
type Logs struct {
	Level string
	Colored bool
	Pretty bool
}

// Config defines the general configuration.
type Config struct {
	Server Server
	Logs Logs
}

// New prepares a new default configuration.
func New() *Config {
	return &Config{}
}
