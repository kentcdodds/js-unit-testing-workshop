#!/usr/bin/env bash

# set up error reporting when piping
set -eou pipefail

apt-add-repository ppa:git-core/ppa
apt-key adv \
  --keyserver hkp://keyserver.ubuntu.com:80 \
  --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list

apt-get update -y
apt-get install -y \
 libssl-dev \
 build-essential \
 git-all \
 curl \
 vim \
 mongodb-org

su - vagrant << NVM
# install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash > /dev/null
# activate nvm
source ~/.nvm/nvm.sh > /dev/null 2>&1
# install node 6
nvm install v6 > /dev/null 2>&1
nvm alias default v6
# add yarn
curl -o- -L https://yarnpkg.com/install.sh | bash
NVM
