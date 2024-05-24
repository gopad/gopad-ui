package command

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/gopad/gopad-ui/pkg/metrics"
	"github.com/gopad/gopad-ui/pkg/router"
	"github.com/oklog/run"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	serverCmd = &cobra.Command{
		Use:   "server",
		Short: "Start integrated server",
		Run:   serverAction,
		Args:  cobra.NoArgs,
	}

	defaultMetricsAddr  = "0.0.0.0:8081"
	defaultMetricsToken = ""
	defaultServerAddr   = "0.0.0.0:8080"
	defaultMetricsPprof = false
	defaultServerHost   = "http://localhost:8080"
	defaultServerRoot   = "/"
	defaultServerAssets = ""
	defaultServerCert   = ""
	defaultServerKey    = ""
	defaultAPIEndpoint  = "http://localhost:8000"
)

func init() {
	rootCmd.AddCommand(serverCmd)

	serverCmd.PersistentFlags().String("metrics-addr", defaultMetricsAddr, "Address to bind the metrics")
	viper.SetDefault("metrics.addr", defaultMetricsAddr)
	_ = viper.BindPFlag("metrics.addr", serverCmd.PersistentFlags().Lookup("metrics-addr"))

	serverCmd.PersistentFlags().String("metrics-token", defaultMetricsToken, "Token to make metrics secure")
	viper.SetDefault("metrics.token", defaultMetricsToken)
	_ = viper.BindPFlag("metrics.token", serverCmd.PersistentFlags().Lookup("metrics-token"))

	serverCmd.PersistentFlags().Bool("metrics-pprof", defaultMetricsPprof, "Enable pprof debugging")
	viper.SetDefault("metrics.pprof", defaultMetricsPprof)
	_ = viper.BindPFlag("metrics.pprof", serverCmd.PersistentFlags().Lookup("metrics-pprof"))

	serverCmd.PersistentFlags().String("server-addr", defaultServerAddr, "Address to bind the server")
	viper.SetDefault("server.addr", defaultServerAddr)
	_ = viper.BindPFlag("server.addr", serverCmd.PersistentFlags().Lookup("server-addr"))

	serverCmd.PersistentFlags().String("server-host", defaultServerHost, "External access to console")
	viper.SetDefault("server.host", defaultServerHost)
	_ = viper.BindPFlag("server.host", serverCmd.PersistentFlags().Lookup("server-host"))

	serverCmd.PersistentFlags().String("server-root", defaultServerRoot, "Path to access the console")
	viper.SetDefault("server.root", defaultServerRoot)
	_ = viper.BindPFlag("server.root", serverCmd.PersistentFlags().Lookup("server-root"))

	serverCmd.PersistentFlags().String("server-assets", defaultServerAssets, "Path to static assets")
	viper.SetDefault("server.assets", defaultServerAssets)
	_ = viper.BindPFlag("server.assets", serverCmd.PersistentFlags().Lookup("server-assets"))

	serverCmd.PersistentFlags().String("server-cert", defaultServerCert, "Path to SSL cert")
	viper.SetDefault("server.cert", defaultServerCert)
	_ = viper.BindPFlag("server.cert", serverCmd.PersistentFlags().Lookup("server-cert"))

	serverCmd.PersistentFlags().String("server-key", defaultServerKey, "Path to SSL key")
	viper.SetDefault("server.key", defaultServerKey)
	_ = viper.BindPFlag("server.key", serverCmd.PersistentFlags().Lookup("server-key"))

	serverCmd.PersistentFlags().String("api-endpoint", defaultAPIEndpoint, "URL for the api server")
	viper.SetDefault("api.endpoint", defaultAPIEndpoint)
	_ = viper.BindPFlag("api.endpoint", serverCmd.PersistentFlags().Lookup("api-endpoint"))
}

func serverAction(_ *cobra.Command, _ []string) {
	token, err := config.Value(cfg.Metrics.Token)

	if err != nil {
		log.Fatal().
			Err(err).
			Msg("Failed to parse metrics token secret")

		os.Exit(1)
	}

	registry := metrics.New(
		metrics.WithNamespace("gopad_ui"),
		metrics.WithToken(token),
	)

	gr := run.Group{}

	{
		server := &http.Server{
			Addr: cfg.Server.Addr,
			Handler: router.Server(
				cfg,
			),
			ReadTimeout:  5 * time.Second,
			WriteTimeout: 10 * time.Second,
		}

		gr.Add(func() error {
			log.Info().
				Str("addr", cfg.Server.Addr).
				Msg("Starting application server")

			if cfg.Server.Cert != "" && cfg.Server.Key != "" {
				return server.ListenAndServeTLS(
					cfg.Server.Cert,
					cfg.Server.Key,
				)
			}

			return server.ListenAndServe()
		}, func(reason error) {
			ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
			defer cancel()

			if err := server.Shutdown(ctx); err != nil {
				log.Error().
					Err(err).
					Msg("Failed to shutdown application gracefully")

				return
			}

			log.Info().
				Err(reason).
				Msg("Shutdown application gracefully")
		})
	}

	{
		server := &http.Server{
			Addr: cfg.Metrics.Addr,
			Handler: router.Metrics(
				cfg,
				registry,
			),
			ReadTimeout:  5 * time.Second,
			WriteTimeout: 10 * time.Second,
		}

		gr.Add(func() error {
			log.Info().
				Str("addr", cfg.Metrics.Addr).
				Msg("Starting metrics server")

			return server.ListenAndServe()
		}, func(reason error) {
			ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
			defer cancel()

			if err := server.Shutdown(ctx); err != nil {
				log.Error().
					Err(err).
					Msg("Failed to shutdown metrics gracefully")

				return
			}

			log.Info().
				Err(reason).
				Msg("Metrics shutdown gracefully")
		})
	}

	{
		stop := make(chan os.Signal, 1)

		gr.Add(func() error {
			signal.Notify(stop, os.Interrupt)

			<-stop

			return nil
		}, func(_ error) {
			close(stop)
		})
	}

	if err := gr.Run(); err != nil {
		os.Exit(1)
	}
}
