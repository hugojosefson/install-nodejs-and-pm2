FROM ubuntu:14.04
MAINTAINER Hugo Josefson <hugo@josefson.org> (https://www.hugojosefson.com/)

RUN echo "Ubuntu packages updated 2018-05-10T08:34:29.697Z"
RUN apt update && apt dist-upgrade -y --purge
RUN apt install -y curl procps tree

## Install Node.js and pm2
COPY install-nodejs-and-pm2 .
RUN chmod +x install-nodejs-and-pm2
RUN ./install-nodejs-and-pm2

## Copy examples from project dir
# COPY example/apps /var/lib/nodejs/apps

## Copy examples from Github
RUN su - nodejs -c "curl -sS -L https://api.github.com/repos/hugojosefson/install-nodejs-and-pm2/tarball/master \
      | tar xzv --strip-components=2 --wildcards '*/example' -C /var/lib/nodejs"

## Set and show correct permissions and nodejs ownership of its files
RUN chown -R nodejs:nodejs /var/lib/nodejs/apps
RUN ls -lF /var/lib/nodejs/apps

## Show the directory structure
RUN tree /var/lib/nodejs