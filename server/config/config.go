package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Key   string `yaml:"apikey"`
	Token string `yaml:"apitoken"`
}

func GetConfig() (Config, error) {
	f, err := os.ReadFile("config.yaml")
	if err != nil {
		return Config{}, fmt.Errorf("unable to read config file: %v", err)
	}

	c := Config{}
	err = yaml.Unmarshal(f, &c)
	if err != nil {
		return Config{}, fmt.Errorf("unable to unmarshal config into struct: %v", err)
	}

	return c, nil
}
