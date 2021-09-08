#!/bin/bash

set -e

# copy the uploads from the deployment to the persistent storage
# and link the persistent storage uploads folder into public
cp -rf public/uploads /opt/storage/uploads
rm -rf public/uploads
ln -s /opt/storage/uploads ./public/uploads

# check if there is already a database present on the persistent storage
# in case there isn't copy the initial db from the repo
if [ ! -f ${DATABASE_FILENAME} ]
then
    mkdir -p `dirname ${DATABASE_FILENAME}`
    cp ./.tmp/data.db ${DATABASE_FILENAME}
fi

# run strapi
yarn start
