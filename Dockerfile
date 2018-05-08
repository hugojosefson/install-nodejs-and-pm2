FROM centos:6.9
MAINTAINER Hugo Josefson <hugo@josefson.org> (https://www.hugojosefson.com/)

RUN echo Last updated CentOS packages 2018-05-08T18:43
RUN yum update -y

COPY install-nodejs-and-pm2 .
RUN ./install-nodejs-and-pm2