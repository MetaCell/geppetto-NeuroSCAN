#!/bin/bash

set -e 

curpwd=$(pwd)


parsers=$curpwd/ingestion/parsers
loaders=$curpwd/ingestion/loaders
data_root=/opt/storage/files/MetaCell\ structure

function clean() {
  rm -rf output
  mkdir -p output
}

function copy_neuroscan() {
  rm -rf $curpwd/data/neuroscan/
  mkdir -p "$curpwd/data/neuroscan/$(dirname $1)"
  cp -r "$data_root/NeuroSCAN/$1" "$curpwd/data/neuroscan/$(dirname $1)"
}

function copy_promoters() {
  cp -rf "$data_root/promoterdb"/* $curpwd/data/promoterdb
}

function zip_cphate() {
  cd "$curpwd/data/neuroscan/$1/cphate"
  rm -f cphate.zip
  zip cphate.zip *
}

function transform_cphate() {
  cd $parsers/c-phate
  echo Transform CPHATE
  python generate_json.py
  mv cphate.json $curpwd/output
  echo "=====================" >> $curpwd/output/output.log
  echo "cphate" >> $curpwd/output/output.log
  echo "=====================" >> $curpwd/output/output.log
  cat *.log >> $curpwd/output/output.log
  rm *.log
}

function transform_contacts() {
  cd $parsers/contacts
  echo Transform Contacts
  python parser.py
  mv *.csv $curpwd/output
  echo "" >> $curpwd/output/output.log
  echo "=====================" >> $curpwd/output/output.log
  echo "contacts" >> $curpwd/output/output.log
  echo "=====================" >> $curpwd/output/output.log
  cat *.log >> $curpwd/output/output.log
  rm *.log
}

function transform_neurons() {
  cd $parsers/neurons
  echo Transform Neurons
  python parser.py
  mv *.csv $curpwd/output
  echo "" >> $curpwd/output/output.log
  echo "=====================" >> $curpwd/output/output.log
  echo "neurons" >> $curpwd/output/output.log
  echo "=====================" >> $curpwd/output/output.log
  cat *.log >> $curpwd/output/output.log
  rm *.log
  cd ..
}

function transform_synapses() {
  cd $parsers/synapses
  echo Transform Synapses
  python parser.py
  mv *.csv $curpwd/output
  echo "" >> $curpwd/output/output.log
  echo "=====================" >> $curpwd/output/output.log
  echo "synapses" >> $curpwd/output/output.log
  echo "=====================" >> $curpwd/output/output.log
  cat *.log >> $curpwd/output/output.log
  rm *.log
}

function avi2mp4() {
  cd $curpwd/data/promoterdb
  bash -c ./avi2mp4.sh
}

function transform_promoters() {
  cd $parsers/promoters
  echo Transform Promoters
  python parser.py
  mv *.csv $curpwd/output
  echo "" >> $curpwd/output/output.log
  echo "=====================" >> $curpwd/output/output.log
  echo "promoters" >> $curpwd/output/output.log
  echo "=====================" >> $curpwd/output/output.log
  cat *.log >> $curpwd/output/output.log
  rm *.log
}

function load_data() {
  cd $loaders
  echo Load Cphate $1
  python cphate.py --timepoint $(basename $1)
  echo Load Neurons $1
  python neurons.py
  echo Load Contacts $1
  python contacts.py
  echo Load Synapses $1
  python synapses.py
  echo Load Promoters $1
  python promoters.py
}


clean

copy_neuroscan "$@"

transform_cphate
zip_cphate "$@"
transform_neurons
transform_contacts
transform_synapses

copy_promoters
transform_promoters
avi2mp4

load_data "$@"

cd $curpwd
