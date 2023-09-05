# Movie Browser
### 🚧 Under construction 🚧

This project has been [deployed on AWS](https://movieapp.yerf.dev/)

## Overview

This app leaverages is a single-page web application that allows users to browse collection of movies and their detail information (duration, released date, overview, trailers, genres, reviews, cast, etc.)

## Demo

![Demo](https://github.com/JeffC25/movie-browser/blob/661282aa04af845ebdc894e283ca037d55a60081/movie-browser-demo.gif)

## Project Structure
```
├── LICENSE
├── README.md
├── client
│   ├── README.md
│   ├── client.Dockerfile
│   ├── index.html
│   ├── nginx
│   │   └── default.conf
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── src
│   │   ├── App.tsx
│   │   ├── api
│   │   │   ├── core
│   │   │   │   ├── ApiError.ts
│   │   │   │   ├── ApiRequestOptions.ts
│   │   │   │   ├── ApiResult.ts
│   │   │   │   ├── CancelablePromise.ts
│   │   │   │   ├── OpenAPI.ts
│   │   │   │   └── request.ts
│   │   │   ├── index.ts
│   │   │   ├── models
│   │   │   │   ├── Cast.ts
│   │   │   │   ├── Error.ts
│   │   │   │   ├── MovieDetails.ts
│   │   │   │   ├── MovieList.ts
│   │   │   │   ├── MoviePreview.ts
│   │   │   │   ├── Person.ts
│   │   │   │   ├── Review.ts
│   │   │   │   ├── ReviewList.ts
│   │   │   │   ├── Video.ts
│   │   │   │   └── VideoList.ts
│   │   │   └── services
│   │   │       └── DefaultService.ts
│   │   ├── components
│   │   │   ├── Layout.tsx
│   │   │   ├── carousel
│   │   │   │   └── Carousel.tsx
│   │   │   ├── mobile
│   │   │   │   └── MobileBar.tsx
│   │   │   ├── movies
│   │   │   │   ├── CastList.tsx
│   │   │   │   ├── CategoryResults.tsx
│   │   │   │   ├── MovieWidget.tsx
│   │   │   │   ├── ReviewList.tsx
│   │   │   │   ├── SearchResults.tsx
│   │   │   │   └── VideoList.tsx
│   │   │   ├── sidebar
│   │   │   │   └── Sidebar.tsx
│   │   │   └── topbar
│   │   │       ├── SearchBar.tsx
│   │   │       └── TopBar.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── scenes
│   │   │   ├── About.tsx
│   │   │   ├── Details.tsx
│   │   │   ├── HomePage.tsx
│   │   │   └── Results.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── docker-compose.yaml
├── nginx
│   ├── default.conf
│   ├── local.conf
│   └── nginx.Dockerfile
├── oapi
│   └── openapi.yaml
└── server
    ├── app
    │   ├── app.go
    │   ├── main.go
    │   └── oapi.go
    ├── config
    │   ├── config-template.yaml
    │   ├── config.go
    │   ├── config.yaml
    │   └── env-template.txt
    ├── go.mod
    ├── go.sum
    ├── log
    │   └── logger.go
    ├── server.Dockerfile
    └── tmdb
        └── tmdb.go
```

## Credits
This product uses the TMDb API but is not endorsed or certified by TMDb. All data and images regarding to movies come from TMDb
