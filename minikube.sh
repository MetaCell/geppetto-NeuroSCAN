#!/bin/bash

eval $(minikube docker-env)

kubectl create ns geppetto-yale

helm upgrade geppetto-yale deployment/helm -n geppetto-yale --install --reset-values
