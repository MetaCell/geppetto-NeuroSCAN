#!/bin/bash

eval $(minikube docker-env)

cd backend || exit
docker build . -t geppetto-yale-neuro-scan-backend

cd .. && cd frontend || exit
docker build . --build-arg REACT_APP_BACKEND_URL="$BACKEND_URL" -t geppetto-yale-neuro-scan-frontend
