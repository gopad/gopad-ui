package fail

import (
	"encoding/json"
	"fmt"
	"net/http"
	"runtime"
	"strconv"
	"strings"
)

var (
	// ErrUnspecified is an error with no cause or reason.
	ErrUnspecified = fmt.Errorf("unspecified error")
)

// Fail is an error that can be used in an HTTP response.
type Fail struct {
	Status  int      `json:"status"`
	Message string   `json:"message"`
	Details []string `json:"details,omitempty"`
	prev    error
	file    string
	line    int
}

// Error implements the error interface.
func (f *Fail) Error() string {
	return fmt.Sprintf("%s:%d: %s", f.file, f.line, f.prev.Error())
}

// String implements the fmt.Stringer interface.
func (f *Fail) String() string {
	return f.Message
}

// Format implements the fmt.Formatter interface.
func (f *Fail) Format(s fmt.State, c rune) {
	var (
		str string
	)

	p, ok := s.Precision()

	if !ok {
		p = -1
	}

	switch c {
	case 'd':
		str = strings.Join(f.Details, ", ")
	case 'e':
		if f.prev == nil {
			str = ErrUnspecified.Error()
		} else {
			str = f.prev.Error()
		}
	case 'f':
		str = f.file
	case 'l':
		str = strconv.Itoa(f.line)
	case 'm':
		str = f.Message
	case 's':
		str = strconv.Itoa(f.Status)
	}

	if ok {
		str = str[:p]
	}

	s.Write([]byte(str))

}

// Cause wraps an error into a fail so it can be used in a response.
func Cause(prev error) *Fail {
	f := &Fail{
		prev: prev,
	}

	f.Caller(1)

	return f
}

// Because returns the previous error if it's a fail.
func Because(err error) error {
	if e, ok := err.(*Fail); ok {
		f := &Fail{
			Status:  e.Status,
			Message: e.Message,
			Details: e.Details,
			prev:    e.prev,
		}

		f.Caller(1)

		return f
	}

	return Cause(err).Unexpected()
}

// Caller finds the file and line where the failure happened.
func (f *Fail) Caller(skip int) {
	if f.prev == ErrUnspecified {
		skip++
	}

	_, file, line, _ := runtime.Caller(skip + 1)

	f.file = file[strings.LastIndex(file, "/")+1:]
	f.line = line
}

// BadRequest changes the error to a "Bad Request" fail.
func (f *Fail) BadRequest(m string, details ...string) error {
	f.Status = http.StatusBadRequest
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusBadRequest)
	}
	f.Details = details

	return f
}

// BadRequest is a convenience function to return a BadRequest fail.
func BadRequest(m string, fields ...string) error {
	return Cause(ErrUnspecified).BadRequest(m, fields...)
}

// Unauthorized changes the error to an "Unauthorized" fail.
func (f *Fail) Unauthorized(m string, details ...string) error {
	f.Status = http.StatusUnauthorized
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusUnauthorized)
	}
	f.Details = details

	return f
}

// Unauthorized is a convenience function to return an Unauthorized fail.
func Unauthorized(m string, fields ...string) error {
	return Cause(ErrUnspecified).Unauthorized(m, fields...)
}

// Forbidden changes an error to a "Forbidden" fail.
func (f *Fail) Forbidden(m string, details ...string) error {
	f.Status = http.StatusForbidden
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusForbidden)
	}
	f.Details = details

	return f
}

// Forbidden is a convenience function to return a Forbidden fail.
func Forbidden(m string, fields ...string) error {
	return Cause(ErrUnspecified).Forbidden(m, fields...)
}

// NotFound changes the error to an "Not Found" fail.
func (f *Fail) NotFound(m string, details ...string) error {
	f.Status = http.StatusNotFound
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusNotFound)
	}

	return f
}

// NotFound is a convenience function to return a Not Found fail.
func NotFound(m string, fields ...string) error {
	return Cause(ErrUnspecified).NotFound(m, fields...)
}

// Conflict changes the error to a "Conflict" fail.
func (f *Fail) Conflict(m string, details ...string) error {
	f.Status = http.StatusConflict
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusConflict)
	}
	f.Details = details

	return f
}

// Conflict is a convenience function to return a Conflict fail.
func Conflict(m string, fields ...string) error {
	return Cause(ErrUnspecified).Conflict(m, fields...)
}

// PreconditionFailed changes the error to a "Precondition Failed" fail.
func (f *Fail) PreconditionFailed(m string, details ...string) error {
	f.Status = http.StatusPreconditionFailed
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusPreconditionFailed)
	}
	f.Details = details

	return f
}

// PreconditionFailed is a convenience function to return a PreconditionFailed fail.
func PreconditionFailed(m string, fields ...string) error {
	return Cause(ErrUnspecified).PreconditionFailed(m, fields...)
}

// UnprocessableEntity changes the error to a "Unprocessable Entity" fail.
func (f *Fail) UnprocessableEntity(m string, details ...string) error {
	f.Status = http.StatusUnprocessableEntity
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusUnprocessableEntity)
	}
	f.Details = details

	return f
}

// UnprocessableEntity is a convenience function to return a UnprocessableEntity fail.
func UnprocessableEntity(m string, fields ...string) error {
	return Cause(ErrUnspecified).UnprocessableEntity(m, fields...)
}

// Locked changes the error to a "Locked" fail.
func (f *Fail) Locked(m string, details ...string) error {
	f.Status = http.StatusLocked
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusLocked)
	}
	f.Details = details

	return f
}

// Locked is a convenience function to return a Locked fail.
func Locked(m string, fields ...string) error {
	return Cause(ErrUnspecified).Locked(m, fields...)
}

// FailedDependency changes the error to a "Failed Dependency" fail.
func (f *Fail) FailedDependency(m string, details ...string) error {
	f.Status = http.StatusFailedDependency
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusFailedDependency)
	}
	f.Details = details

	return f
}

// FailedDependency is a convenience function to return a FailedDependency fail.
func FailedDependency(m string, fields ...string) error {
	return Cause(ErrUnspecified).FailedDependency(m, fields...)
}

// PreconditionRequired changes the error to a "Precondition Required" fail.
func (f *Fail) PreconditionRequired(m string, details ...string) error {
	f.Status = http.StatusPreconditionRequired
	if m != "" {
		f.Message = m
	} else {
		f.Message = http.StatusText(http.StatusPreconditionRequired)
	}
	f.Details = details

	return f
}

// PreconditionRequired is a convenience function to return a PreconditionRequired fail.
func PreconditionRequired(m string, fields ...string) error {
	return Cause(ErrUnspecified).PreconditionRequired(m, fields...)
}

// Unexpected morphs the error into an "Internal Server Error" fail.
func (f *Fail) Unexpected() error {
	f.Status = http.StatusInternalServerError
	f.Message = http.StatusText(http.StatusInternalServerError)

	return f
}

// Unexpected is a convenience function to return an Unexpected fail.
func Unexpected() error {
	return Cause(ErrUnspecified).Unexpected()
}

// IsBadRequest returns true if fail is a BadRequest fail, false otherwise.
func IsBadRequest(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusBadRequest
}

// IsUnauthorized returns true if fail is a Unauthorized fail, false otherwise.
func IsUnauthorized(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusUnauthorized
}

// IsForbidden returns true if fail is a Forbidden fail, false otherwise.
func IsForbidden(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusForbidden
}

// IsNotFound returns true if fail is a NotFound fail, false otherwise.
func IsNotFound(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusNotFound
}

// IsConflict returns true if fail is a Conflict fail, false otherwise.
func IsConflict(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusConflict
}

// IsPreconditionFailed returns true if fail is a PreconditionFailed fail, false otherwise.
func IsPreconditionFailed(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusPreconditionFailed
}

// IsUnprocessableEntity returns true if fail is a UnprocessableEntity fail, false otherwise.
func IsUnprocessableEntity(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusUnprocessableEntity
}

// IsLocked returns true if fail is a Locked fail, false otherwise.
func IsLocked(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusLocked
}

// IsFailedDependency returns true if fail is a FailedDependency fail, false otherwise.
func IsFailedDependency(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusFailedDependency
}

// IsPreconditionRequired returns true if fail is a PreconditionRequired fail, false otherwise.
func IsPreconditionRequired(err error) bool {
	e, ok := err.(*Fail)
	return ok && e.Status == http.StatusPreconditionRequired
}

// IsUnknown returns true if err is not handled as a fail, false otheriwse.
func IsUnknown(err error) bool {
	_, ok := err.(*Fail)
	return !ok
}

// Say returns the HTTP status and message response of a fail.
func Say(err error) (int, string) {
	switch e := err.(type) {
	case nil:
		return http.StatusOK, http.StatusText(http.StatusOK)
	case *Fail:
		return e.Status, e.Message
	}

	return http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError)
}

// ErrorPlain complements `http.Error` by sending a fail response.
func ErrorPlain(w http.ResponseWriter, err error) {
	status, m := Say(err)

	w.Header().Set("Content-Type", "text/plain")

	w.WriteHeader(status)
	fmt.Fprintln(w, m)
}

// ErrorJSON complements `http.Error` by sending a fail response.
func ErrorJSON(w http.ResponseWriter, err error) {
	status, _ := Say(err)

	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(status)
	json.NewEncoder(w).Encode(err.(*Fail))
}
