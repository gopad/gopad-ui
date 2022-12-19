package config

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
	Static string `mapstructure:"static"`
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
