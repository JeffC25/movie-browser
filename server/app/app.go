package main

import (
	"errors"
)

var (
	ErrServer         = errors.New("server error")
	ErrInvalidJSON    = errors.New("could not decode JSON")
	ErrInvalidRequest = errors.New("could not validate request")
)
