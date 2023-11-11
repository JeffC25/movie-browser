# Movie Browser 

This project has been [deployed on AWS](https://movieapp.yerf.dev/)

## Overview

This app leaverages is a single-page web application that allows users to browse collection of movies and their detail information (duration, released date, overview, trailers, genres, reviews, cast, etc.)

## Demo

![Demo](https://github.com/JeffC25/movie-browser/blob/main/demo/movie-browser-demo.gif?raw=true)

## Setup

This application leverages The Movie Database (TMDB) API; to run this application locally, please [request for an API key](https://developer.themoviedb.org/).
Next, populate your environment variables as shown in server/config/env-template.txt, including the api key and access token retrieved from TMDB.

The project is containerized with Docker and Docker-Compose. Please ensure that Docker is installed and run `docker compose up` in the project directory.
To view the application, navigate to http://localhost:3050 in your browser.

## Technologies Used

- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Go](https://go.dev/)
- [Redis](https://redis.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Nginx](https://www.nginx.com/)
- [AWS](https://aws.amazon.com/)

## Credits
This product uses the TMDb API but is not endorsed or certified by TMDB. All data and images regarding to movies come from TMDB.
