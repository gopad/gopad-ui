package main

import (
	"os"

	"github.com/gopad/gopad-ui/pkg/command"
	"github.com/joho/godotenv"
)

func main() {
	if env := os.Getenv("GOPAD_UI_ENV_FILE"); env != "" {
		godotenv.Load(env)
	}

	if err := command.Run(); err != nil {
		os.Exit(1)
	}
}
