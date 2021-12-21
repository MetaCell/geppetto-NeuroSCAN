yarn global add yalc
app=$(pwd)
cd $app/geppetto-meta/geppetto.js/geppetto-core
yarn && yarn build && yarn publish:yalc
cd $app/geppetto-meta/geppetto.js/geppetto-ui
yarn && yarn build && yarn publish:yalc
cd $app/geppetto-meta/geppetto.js/geppetto-client
yarn && yarn build && yarn publish:yalc
cd $app
yalc add @metacell/geppetto-meta-client
yalc add @metacell/geppetto-meta-core
yalc add @metacell/geppetto-meta-ui
yarn