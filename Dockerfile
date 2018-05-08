FROM centos:6.9
MAINTAINER Hugo Josefson <hugo@josefson.org> (https://www.hugojosefson.com/)

RUN echo Last updated packages 2018-05-08T18:29
RUN yum update -y
