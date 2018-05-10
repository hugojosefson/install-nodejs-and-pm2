FROM ubuntu:14.04
MAINTAINER Hugo Josefson <hugo@josefson.org> (https://www.hugojosefson.com/)

RUN echo "Ubuntu packages updated 2018-05-10T08:34:29.697Z"
RUN apt update && apt dist-upgrade -y --purge

RUN apt install -y curl

COPY install-nodejs-and-pm2 .

RUN chmod +x install-nodejs-and-pm2
RUN ./install-nodejs-and-pm2
