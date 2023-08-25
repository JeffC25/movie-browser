FROM golang:latest AS builder
WORKDIR /app
COPY go.mod go.sum config.yaml ./ 
# TODO remove config from image at some point
RUN go mod download
COPY . .

RUN CGO_ENABLED=0 go build -o app ./app/main

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /app/
COPY db/migrations /app/db/migrations
COPY --from=builder /app/betmoe .
COPY --from=builder /app/config.yaml .