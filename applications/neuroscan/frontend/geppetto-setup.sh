#git clone https://github.com/MetaCell/geppetto-meta/
cd geppetto-meta
#git checkout development

#sleep 60

app=$(pwd)

cd $app/geppetto.js/geppetto-core
yarn && yarn build && yarn publish:yalc

cd $app/geppetto.js/geppetto-ui
yarn && yarn build && yarn publish:yalc

cd $app/geppetto.js/geppetto-client
yarn && yarn build && yarn publish:yalc

cd $app/..

yalc add @metacell/geppetto-meta-client
yalc add @metacell/geppetto-meta-core
yalc add @metacell/geppetto-meta-ui

yarn
