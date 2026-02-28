package cache

import (
	"github.com/redis/go-redis/v9"
)

// stub
func NewRedis(url string) *redis.Client {

	opt, err := redis.ParseURL(url)

	if err != nil {
		panic(err)
	}

	return redis.NewClient(opt)
}
