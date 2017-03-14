# node boron is 6(.x LTS) line, official image is the base
FROM node:boron

# needs xvfb to run correctly
RUN apt-get update -q \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
  xvfb

# get yarn and mongodb
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV MONGODB_VERSION="3.4.2"
RUN wget --quiet http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-$MONGODB_VERSION.tgz \
  && tar xfz mongodb-linux-x86_64-$MONGODB_VERSION.tgz

# make sure our PATH includes yarn and mongo(d)
ENV PATH /mongodb-linux-x86_64-$MONGODB_VERSION/bin:/root/.yarn/bin:$PATH

# we work out of the container's /src/ dir, copy in files to build
WORKDIR /src
COPY . /src
# npm installs, then run setup script
RUN npm install -g --quiet nodemon jest \
  && npm install --quiet
RUN npm run setup

# when run, this image will expose ports, allow binding of directory
EXPOSE 3000 8080 5858 27018
VOLUME /src

# start w/ this command unless otherwise specified
ENTRYPOINT ["/bin/bash", "-c", "npm start dev"]
