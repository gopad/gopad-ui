package command

import (
	"testing"

	"github.com/gopad/gopad-ui/pkg/config"
	"github.com/stretchr/testify/assert"
)

func TestSetupLogger(t *testing.T) {
	assert.NoError(t, setupLogger(config.Load()))
}
