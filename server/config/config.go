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
	// f, err := os.ReadFile("./config/config.yaml")
	// if err != nil {
	// 	return Config{}, fmt.Errorf("unable to read config file: %v", err)
	// }

	// c := Config{}
	// err = yaml.Unmarshal(f, &c)
	// if err != nil {
	// 	return Config{}, fmt.Errorf("unable to unmarshal config into struct: %v", err)
	// }
	c := Config{}

	c.Key = os.Getenv("APIKEY")
	c.Token = os.Getenv("APITOKEN")
	c.LogLevel, _ = strconv.Atoi(os.Getenv("LOGLEVEL"))
	c.Client = os.Getenv("CLIENTPORT")
	c.RedisURL = os.Getenv("REDISURL")

	return c, nil
}
