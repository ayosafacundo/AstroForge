package config

import (
	"os"
)

type Config struct {
	DatabaseURL string
	RedisURL    string
	JWTSecret   string
	Minio       MinioConfig
}

type MinioConfig struct {
	Endpoint  string
	AccessKey string
	SecretKey string
	Bucket    string
}

func Load() *Config {
	return &Config{
		DatabaseURL: os.Getenv("DATABASE_URI"),
		RedisURL:    os.Getenv("REDIS_URL"),
		JWTSecret:   os.Getenv("JWT_SECRET"),
		Minio: MinioConfig{
			Endpoint:  os.Getenv("MINIO_ENDPOINT"),
			AccessKey: os.Getenv("MINIO_ACCESS"),
			SecretKey: os.Getenv("MINIO_SECRET"),
			Bucket:    os.Getenv("MINIO_BUCKET"),
		},
	}
}
