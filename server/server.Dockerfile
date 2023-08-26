FROM golang:latest
WORKDIR /app
COPY . .
RUN go mod download

RUN CGO_ENABLED=0 go build -o main ./app/
CMD ["./main"]
EXPOSE 8080