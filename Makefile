NAME := gopad-ui
IMPORT := github.com/gopad/$(NAME)
DIST := dist

EXECUTABLE := $(NAME)

ifeq ($(OS), Windows_NT)
	EXECUTABLE := $(NAME).exe
	HAS_RETOOL := $(shell where retool)
	HAS_XGO := $(shell where xgo)
else
	EXECUTABLE := $(NAME)
	HAS_RETOOL := $(shell command -v retool)
	HAS_XGO := $(shell command -v xgo)
endif

PACKAGES ?= $(shell go list ./... | grep -v /vendor/ | grep -v /_tools/)
SOURCES ?= $(shell find . -name "*.go" -type f -not -path "./vendor/*" -not -path "./_tools/*")
GENERATE ?= $(IMPORT)/pkg/assets

TAGS ?=

ifndef VERSION
	ifneq ($(DRONE_TAG),)
		VERSION ?= $(subst v,,$(DRONE_TAG))
	else
		ifneq ($(DRONE_BRANCH),)
			VERSION ?= $(subst release/v,,$(DRONE_BRANCH))
		else
			VERSION ?= master
		endif
	endif
endif

ifndef SHA
	SHA := $(shell git rev-parse --short HEAD)
endif

ifndef DATE
	DATE := $(shell date -u '+%Y%m%d')
endif

LDFLAGS += -s -w -X "$(IMPORT)/pkg/version.VersionDev=$(SHA)" -X "$(IMPORT)/pkg/version.VersionDate=$(DATE)"

.PHONY: all
all: build

.PHONY: update
update:
	retool do dep ensure -update

.PHONY: sync
sync:
	retool sync
	retool do dep ensure

.PHONY: graph
graph:
	retool do dep status -dot | dot -T png -o docs/deps.png

.PHONY: clean
clean:
	go clean -i ./...
	rm -rf $(EXECUTABLE) $(DIST)/binaries $(DIST)/release pkg/assets/ab0x.go

.PHONY: fmt
fmt:
	gofmt -s -w $(SOURCES)

.PHONY: vet
vet:
	go vet $(PACKAGES)

.PHONY: megacheck
megacheck:
	retool do megacheck -tags '$(TAGS)' $(PACKAGES)

.PHONY: lint
lint:
	for PKG in $(PACKAGES); do retool do golint -set_exit_status $$PKG || exit 1; done;

.PHONY: generate
generate:
	retool do go generate $(GENERATE)

.PHONY: test
test:
	for PKG in $(PACKAGES); do go test -cover -coverprofile $$GOPATH/src/$$PKG/coverage.out $$PKG || exit 1; done;

.PHONY: install
install: $(SOURCES)
	go install -v -tags '$(TAGS)' -ldflags '$(LDFLAGS)' ./cmd/$(NAME)

.PHONY: build
build: $(EXECUTABLE)

$(EXECUTABLE): $(SOURCES)
	go build -i -v -tags '$(TAGS)' -ldflags '$(LDFLAGS)' -o $@ ./cmd/$(NAME)

.PHONY: release
release: release-dirs release-windows release-linux release-darwin release-copy release-check

.PHONY: release-dirs
release-dirs:
	mkdir -p $(DIST)/binaries $(DIST)/release

.PHONY: release-windows
release-windows: xgo
	xgo -dest $(DIST)/binaries -tags 'netgo $(TAGS)' -ldflags '-linkmode external -extldflags "-static" $(LDFLAGS)' -targets 'windows/*' -out $(EXECUTABLE)-$(VERSION)  ./cmd/$(NAME)
ifeq ($(CI),drone)
	mv /build/* $(DIST)/binaries
endif

.PHONY: release-linux
release-linux: xgo
	xgo -dest $(DIST)/binaries -tags 'netgo $(TAGS)' -ldflags '-linkmode external -extldflags "-static" $(LDFLAGS)' -targets 'linux/*' -out $(EXECUTABLE)-$(VERSION)  ./cmd/$(NAME)
ifeq ($(CI),drone)
	mv /build/* $(DIST)/binaries
endif

.PHONY: release-darwin
release-darwin: xgo
	xgo -dest $(DIST)/binaries -tags 'netgo $(TAGS)' -ldflags '$(LDFLAGS)' -targets 'darwin/*' -out $(EXECUTABLE)-$(VERSION)  ./cmd/$(NAME)
ifeq ($(CI),drone)
	mv /build/* $(DIST)/binaries
endif

.PHONY: release-copy
release-copy:
	$(foreach file,$(wildcard $(DIST)/binaries/$(EXECUTABLE)-*),cp $(file) $(DIST)/release/$(notdir $(file));)

.PHONY: release-check
release-check:
	cd $(DIST)/release; $(foreach file,$(wildcard $(DIST)/release/$(EXECUTABLE)-*),sha256sum $(notdir $(file)) > $(notdir $(file)).sha256;)

.PHONY: publish
publish: release

.PHONY: retool
retool:
ifndef HAS_RETOOL
	go get -u github.com/twitchtv/retool
endif
	retool build

.PHONY: xgo
xgo:
ifndef HAS_XGO
	go get -u github.com/karalabe/xgo
endif
