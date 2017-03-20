# node boron is 6(.x LTS) line, official image is the base
FROM node:boron

# needs xvfb and others to run correctly
# src: https://docs.cypress.io/docs/continuous-integration#section-dependencies
RUN echo \
   'deb ftp://ftp.us.debian.org/debian/ jessie main\n \
    deb ftp://ftp.us.debian.org/debian/ jessie-updates main\n \
    deb http://security.debian.org jessie/updates main\n' \
    > /etc/apt/sources.list
RUN apt-get update -q \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
  xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# get mongodb
ENV MONGODB_VERSION="3.4.2"
RUN wget --quiet http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-$MONGODB_VERSION.tgz \
  && tar xfz mongodb-linux-x86_64-$MONGODB_VERSION.tgz

# make sure our PATH includes mongo(d)
ENV PATH /mongodb-linux-x86_64-$MONGODB_VERSION/bin:$PATH

# we work out of the container's /src/ dir, copy in files to build
WORKDIR /src
COPY . /src
# npm installs, then run setup script
RUN yarn add global --quiet nodemon jest \
  && yarn
RUN yarn run setup

# when run, this image will expose ports, allow binding of directory
EXPOSE 3000 8080 5858 27017 27018
VOLUME /src

# start w/ this command unless otherwise specified
ENTRYPOINT ["/bin/bash", "-c", "yarn start dev"]
