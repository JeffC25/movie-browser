FROM nginx
EXPOSE 80
COPY ./nginx.docker.conf /etc/nginx/conf.d/default.conf