# Auto generated binary variables helper managed by https://github.com/bwplotka/bingo v0.9. DO NOT EDIT.
# All tools are designed to be build inside $GOBIN.
BINGO_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
GOPATH ?= $(shell go env GOPATH)
GOBIN  ?= $(firstword $(subst :, ,${GOPATH}))/bin
GO     ?= $(shell which go)

# Below generated variables ensure that every time a tool under each variable is invoked, the correct version
# will be used; reinstalling only if needed.
# For example for fileb0x variable:
#
# In your main Makefile (for non array binaries):
#
#include .bingo/Variables.mk # Assuming -dir was set to .bingo .
#
#command: $(FILEB0X)
#	@echo "Running fileb0x"
#	@$(FILEB0X) <flags/args..>
#
FILEB0X := $(GOBIN)/fileb0x-v1.1.4
$(FILEB0X): $(BINGO_DIR)/fileb0x.mod
	@# Install binary/ries using Go 1.14+ build command. This is using bwplotka/bingo-controlled, separate go module with pinned dependencies.
	@echo "(re)installing $(GOBIN)/fileb0x-v1.1.4"
	@cd $(BINGO_DIR) && GOWORK=off $(GO) build -mod=mod -modfile=fileb0x.mod -o=$(GOBIN)/fileb0x-v1.1.4 "github.com/UnnoTed/fileb0x"

GOLANGCI_LINT := $(GOBIN)/golangci-lint-v1.61.0
$(GOLANGCI_LINT): $(BINGO_DIR)/golangci-lint.mod
	@# Install binary/ries using Go 1.14+ build command. This is using bwplotka/bingo-controlled, separate go module with pinned dependencies.
	@echo "(re)installing $(GOBIN)/golangci-lint-v1.61.0"
	@cd $(BINGO_DIR) && GOWORK=off $(GO) build -mod=mod -modfile=golangci-lint.mod -o=$(GOBIN)/golangci-lint-v1.61.0 "github.com/golangci/golangci-lint/cmd/golangci-lint"

REVIVE := $(GOBIN)/revive-v1.4.0
$(REVIVE): $(BINGO_DIR)/revive.mod
	@# Install binary/ries using Go 1.14+ build command. This is using bwplotka/bingo-controlled, separate go module with pinned dependencies.
	@echo "(re)installing $(GOBIN)/revive-v1.4.0"
	@cd $(BINGO_DIR) && GOWORK=off $(GO) build -mod=mod -modfile=revive.mod -o=$(GOBIN)/revive-v1.4.0 "github.com/mgechev/revive"

STATICCHECK := $(GOBIN)/staticcheck-v0.5.1
$(STATICCHECK): $(BINGO_DIR)/staticcheck.mod
	@# Install binary/ries using Go 1.14+ build command. This is using bwplotka/bingo-controlled, separate go module with pinned dependencies.
	@echo "(re)installing $(GOBIN)/staticcheck-v0.5.1"
	@cd $(BINGO_DIR) && GOWORK=off $(GO) build -mod=mod -modfile=staticcheck.mod -o=$(GOBIN)/staticcheck-v0.5.1 "honnef.co/go/tools/cmd/staticcheck"

