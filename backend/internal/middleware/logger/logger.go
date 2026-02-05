package logger

import (
	"fmt"
	"os"
	"runtime"
	"strings"
	"time"
)

func print(datetime string, packageName string, msg string) {
	fmt.Printf("[%s] %-12s : %s\n", datetime, "<"+packageName+">", msg)
}

func getCaller() (uintptr, bool) {
	pc, _, _, ok := runtime.Caller(2)
	return pc, ok
}

func Logf(msg string, v ...any) {
	pc, ok := getCaller()
	if !ok {
		fmt.Println("Unknown:", msg)
		return
	}

	fn := runtime.FuncForPC(pc)
	if fn == nil {
		fmt.Println("Unknown:", msg)
		return
	}

	fullname := fn.Name()
	packageName := fullname[strings.LastIndex(fullname, "/")+1 : strings.LastIndex(fullname, ".")]
	datetime := time.Now()
	print(datetime.Format("02/01/2006 - 15:04:05"), packageName, fmt.Sprintf(msg, v...))
}

func Log(msg string) {

	pc, ok := getCaller()

	if !ok {
		fmt.Println("Unknown:", msg)
		return
	}

	fn := runtime.FuncForPC(pc)
	if fn == nil {
		fmt.Println("Unknown:", msg)
		return
	}

	fullname := fn.Name()
	packageName := fullname[:strings.LastIndex(fullname, ".")]
	datetime := time.Now()
	print(datetime.Format("02/01/2006 - 15:04:05"), packageName, msg)
}

func Debug(msg string) {
	pc, ok := getCaller()
	var name string
	if !ok {
		name = "Unknown:"
	} else {
		name = runtime.FuncForPC(pc).Name()
		name = name[strings.LastIndex(name, "/"):strings.LastIndex(name, ".")]
	}
	env := os.Getenv("environment")
	switch env {
	case "production":
		return
	case "development":
		print(time.Now().Format("02/01/2006 - 15:04:05"), name, msg)
		return
	default:
		nmsg := "wrong env parameter \"environment\"."
		print(time.Now().Format("02/01/2006 - 15:04:05"), name, nmsg)
		return
	}
}
