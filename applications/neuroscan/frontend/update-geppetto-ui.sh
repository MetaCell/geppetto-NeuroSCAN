#!/bin/sh

set -e

cd geppetto-meta

app=$(pwd)

cd $app/geppetto.js/geppetto-ui
yarn && yarn build:dev && yarn publish:yalc

cd $app/geppetto.js/geppetto-client
yarn && yarn build:dev && yarn publish:yalc

cd $app/..

yarn
REACT_APP_BACKEND_URL=https://yale.metacell.us yarn run start
