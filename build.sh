#!/bin/bash

eval $(minikube docker-env)

cd backend || exit
docker build . -t geppetto-yale-neuro-scan-backend

cd .. && cd frontend || exit
docker build . -t geppetto-yale-neuro-scan-frontend
