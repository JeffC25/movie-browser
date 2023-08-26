package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Key      string `yaml:"apikey"`
	Token    string `yaml:"apitoken"`
	LogLevel int    `yaml:"loglevel"`
}

func GetConfig() (Config, error) {
	f, err := os.ReadFile("./config/config.yaml")
	if err != nil {
		return Config{}, fmt.Errorf("unable to read config file: %v", err)
	}

	c := Config{}
	err = yaml.Unmarshal(f, &c)
	if err != nil {
		return Config{}, fmt.Errorf("unable to unmarshal config into struct: %v", err)
	}

	// CGO_ENABLED=0 go build -o main ./app/
	// level, err := strconv.Atoi(os.Getenv("LOGLEVEL"))
	// if err != nil {
	// 	fmt.Println("could not get log level")
	// 	level = 1
	// }

	// c := Config{
	// 	Key:      os.Getenv("APIKEY"),
	// 	Token:    os.Getenv("APITOKEN"),
	// 	LogLevel: level,
	// }

	return c, nil
}
