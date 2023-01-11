#!/bin/bash

# Setup script for creating a minikube instance and build the needed applications

NAMESPACE=neuroscan

minikube start --cpus 2 --memory=2g --disk-size 60g --driver=docker

minikube addons enable ingress
minikube addons enable metrics-server

# make sure we are on minikube
kubectl config use-context minikube

kubectl create ns ${NAMESPACE}

# Argo
# kubectl create ns argo-workflows
# kubectl create ns argo
# kubectl apply -n argo -f https://raw.githubusercontent.com/argoproj/argo/v2.4.3/manifests/install.yaml
# kubectl create rolebinding argo-workflows --clusterrole=admin --serviceaccount=argo-workflows:argo-workflows -n argo-workflows
# kubectl create rolebinding argo-workflows-default --clusterrole=admin --serviceaccount=${NAMESPACE}:default -n argo-workflows

kubectl create rolebinding ${NAMESPACE}-admin-default --clusterrole=admin --serviceaccount=${NAMESPACE}:default -n ${NAMESPACE}

eval $(minikube docker-env)

harness-deployment cloud-harness . -l -n ${NAMESPACE} -d yale.local -dtls -e dev -i neuroscan

eval $(minikube docker-env)
kubectl config use-context minikube
skaffold dev --cleanup=false

echo To activate the minikube cluster please execute: eval \$\(minikube docker-env\)
