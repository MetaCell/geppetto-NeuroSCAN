#!/bin/bash

eval $(minikube docker-env)

cd applications/neuroscan || exit
docker build . -t neuroscan

cd -
