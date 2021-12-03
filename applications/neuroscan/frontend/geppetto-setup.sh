#!/bin/sh

set -e

rm -rf node_modules
rm -rf yarn.lock
cp development_package package.json 

yarn global add yalc

[ ! -d "./geppetto-meta/" ] && git clone https://github.com/MetaCell/geppetto-meta/
cd geppetto-meta
#git checkout development

app=$(pwd)

cd $app/geppetto.js/geppetto-core
rm -rf node_modules
yarn && yarn build && yarn publish:yalc

cd $app/geppetto.js/geppetto-ui
rm -rf node_modules
yarn && yarn build:dev && yarn publish:yalc

cd $app/geppetto.js/geppetto-client
rm -rf node_modules
yarn && yarn build && yarn publish:yalc

cd $app/..

yalc add @metacell/geppetto-meta-client
yalc add @metacell/geppetto-meta-core
yalc add @metacell/geppetto-meta-ui
