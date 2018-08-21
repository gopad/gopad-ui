package config

// Server defines the webserver configuration.
type Server struct {
	Host   string
	Root   string
	Addr   string
	Static string
	Pprof  bool
}

// API defines the api server configuration.
type API struct {
	Endpoint string
}

// Metrics defines the metrics server configuration.
type Metrics struct {
	Addr  string
	Token string
}

// Logs defines the level and color for log configuration.
type Logs struct {
	Level  string
	Pretty bool
	Color  bool
}

// Config is a combination of all available configurations.
type Config struct {
	Server  Server
	API     API
	Metrics Metrics
	Logs    Logs
}

// Load initializes a default configuration struct.
func Load() *Config {
	return &Config{}
}
