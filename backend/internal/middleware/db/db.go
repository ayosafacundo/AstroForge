package db

import (
	"errors"
	"fmt"
	"os"

	"github.com/ayosafacundo/AstroForge/internal/middleware/logger"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DBInit() (*gorm.DB, error) {
	user := os.Getenv("dbuser")
	password := os.Getenv("dbpassword")
	dbname := os.Getenv("dbname")
	port := os.Getenv("dbport")
	TimeZone := os.Getenv("dbTimeZone")
	if (user != "") ||
		(password != "") ||
		(dbname != "") ||
		(port != "") ||
		(TimeZone != "") {
		logger.Log("Couldn't connect to DB, incorrect environment variables.")
		// logger.Logf("user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=%s", dbuser, dbpassword, dbname, port, TimeZone) // Debug.
		return nil, errors.New("env file doesn't contain the correct environments. needed dbuser, dbpassword, dbname, dbport, dbTimeZone")
	}

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  fmt.Sprintf("user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=%s", user, password, dbname, port, TimeZone),
		PreferSimpleProtocol: true, // disables implicit prepared statement usage
	}), &gorm.Config{})

	return db, err
}
