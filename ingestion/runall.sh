#!/bin/bash

set -e 

rm -rf output
mkdir -p output
cd ingestion/parsers

cd c-phate
python generate_json.py
mv cphate.json ../../../output
echo "=====================" >> ../../../output/output.log
echo "cphate" >> ../../../output/output.log
echo "=====================" >> ../../../output/output.log
cat *.log >> ../../../output/output.log
# rm *.log
cd ..

cd contacts
python parser.py
mv *.csv ../../../output
echo "" >> ../../../output/output.log
echo "=====================" >> ../../../output/output.log
echo "contacts" >> ../../../output/output.log
echo "=====================" >> ../../../output/output.log
cat *.log >> ../../../output/output.log
# rm *.log
cd ..

cd neurons
python parser.py
mv *.csv ../../../output
echo "" >> ../../../output/output.log
echo "=====================" >> ../../../output/output.log
echo "neurons" >> ../../../output/output.log
echo "=====================" >> ../../../output/output.log
cat *.log >> ../../../output/output.log
# rm *.log
cd ..

cd promoters
python parser.py
mv *.csv ../../../output
echo "" >> ../../../output/output.log
echo "=====================" >> ../../../output/output.log
echo "promoters" >> ../../../output/output.log
echo "=====================" >> ../../../output/output.log
cat *.log >> ../../../output/output.log
# rm *.log
cd ..

cd synapses
python parser.py
mv *.csv ../../../output
echo "" >> ../../../output/output.log
echo "=====================" >> ../../../output/output.log
echo "synapses" >> ../../../output/output.log
echo "=====================" >> ../../../output/output.log
cat *.log >> ../../../output/output.log
# rm *.log
cd ..

cd ../..
