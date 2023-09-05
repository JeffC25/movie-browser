package config

import (
	"os"
	"strconv"
)

type Config struct {
	Key      string
	Token    string
	LogLevel int
	Client   string
	RedisURL string
}

func GetConfig() (Config, error) {
	c := Config{}

	c.Key = os.Getenv("APIKEY")
	c.Token = os.Getenv("APITOKEN")
	c.LogLevel, _ = strconv.Atoi(os.Getenv("LOGLEVEL"))
	c.Client = os.Getenv("CLIENTURL")
	c.RedisURL = os.Getenv("REDISURL")

	return c, nil
}
