FROM centos:6.9
MAINTAINER Hugo Josefson <hugo@josefson.org> (https://www.hugojosefson.com/)

RUN echo Last updated CentOS packages 2018-05-08T18:43
RUN yum update -y

ENV NODEJS_USER=nodejs
ENV NODEJS_HOME_DIR=/var/lib/$NODEJS_USER
ENV NVM_VERSION=0.33.11
ENV NVM_DIR=$NODEJS_HOME_DIR/.nvm
ENV NODE_VERSION=10

RUN useradd --system --create-home --home-dir $NODEJS_HOME_DIR $NODEJS_USER
USER $NODEJS_USER
RUN mkdir -p $NVM_DIR
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash
RUN . $NVM_DIR/nvm.sh && nvm install $NODE_VERSION
RUN . $NVM_DIR/nvm.sh && npm install -g npm

RUN . $NVM_DIR/nvm.sh && npm install -g pm2
USER root
RUN . $NVM_DIR/nvm.sh && pm2 startup systemv -u $NODEJS_USER
