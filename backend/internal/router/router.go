package router

import (
	"net/http"

	"github.com/ayosafacundo/AstroForge/internal/middleware/logger"
)

type Method string

const (
	GET     Method = "GET"
	POST    Method = "POST"
	PUT     Method = "PUT"
	PATCH   Method = "PATCH"
	DELETE  Method = "DELETE"
	CONNECT Method = "CONNECT"
	OPTIONS Method = "OPTIONS"
	TRACE   Method = "TRACE"
)

type RouteHandler struct {
	path    string
	handler func(http.ResponseWriter, *http.Request)
	method  Method
}

var Routes []RouteHandler

func RegisterRoutes() *http.ServeMux {
	router := http.NewServeMux()
	for _, item := range Routes {
		path := string(item.method) + " " + item.path
		router.HandleFunc(path, item.handler)
	}
	return router
}

func AddRoute(path string, handler func(http.ResponseWriter, *http.Request), method Method) {
	logger.Logf("Added route %s with method %s to handler\n", path, method)
	route := RouteHandler{path, handler, method}
	Routes = append(Routes, route)
}
