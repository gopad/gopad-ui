package config

type server struct {
	Host          string
	Addr          string
	Cert          string
	Key           string
	Root          string
	Endpoint      string
	Static        string
	Storage       string
	LetsEncrypt   bool
	StrictCurves  bool
	StrictCiphers bool
	Pprof         bool
}

var (
	// LogLevel defines the log level used by our logging package.
	LogLevel string

	// Server represents the informations about the server bindings.
	Server = &server{}
)
