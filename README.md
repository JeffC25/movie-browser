# Movie Browser 

This app has been [deployed on AWS](https://movieapp.yerf.dev/)

## Overview

This is a web application that allows users to browse and discover collections of movies and their details (duration, released date, overview, trailers, genres, reviews, cast, etc.)

## Demo

![Demo](https://github.com/JeffC25/movie-browser/blob/main/demo/movie-browser-demo.gif?raw=true)

## API

The standalone REST API can be accessed at `https://movie.yerf.dev/api/_`

The OpenAPI document can be found at [/oapi/openapi.yaml](https://github.com/JeffC25/movie-browser/blob/main/oapi/openapi.yaml)

#### Example:
https://movie.yerf.dev/api/popular?page=2


## Local Setup

This application leverages The Movie Database (TMDB) API; to run this application locally, please [request for an API key](https://developer.themoviedb.org/).
Next, populate your environment variables as shown in [server/config/env-template.txt](https://github.com/JeffC25/movie-browser/blob/main/server/config/env-template.txt), including the api key and access token retrieved from TMDB.

The project is containerized with Docker and Docker-Compose. 
Please ensure that Docker and Docker-Compose are installed and run ```docker compose up``` in the project's root directory.
To view the application, navigate to `http://localhost:3050` in your browser.

## Technologies Used

#### Frontend UI
- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
#### API Server
- [Go](https://go.dev/)
- [chi](https://go-chi.io/)

#### Storage and Cache
- [Redis](https://redis.io/)
- [PostgreSQL](https://www.postgresql.org/)
#### Deployment
- [Docker](https://www.docker.com/)
- [Nginx](https://www.nginx.com/)
- [AWS](https://aws.amazon.com/)

## Credits
Information courtesy of
[IMDb](https://www.imdb.com).
Used with permission.

