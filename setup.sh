#!/bin/bash

# Setup script for creating a minikube instance and build the needed applications

NAMESPACE=yale

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
# kubectl create rolebinding argo-workflows-default --clusterrole=admin --serviceaccount=yale:default -n argo-workflows

kubectl create rolebinding yale-admin-default --clusterrole=admin --serviceaccount=yale:default -n ${NAMESPACE}

eval $(minikube docker-env)

harness-deployment cloud-harness . -l -m build -n ${NAMESPACE} -d yale.local -dtls -e dev -i neuroscan

eval $(minikube docker-env)
kubectl config use-context minikube
skaffold dev --cleanup=false

echo To activate the minikube cluster please execute: eval \$\(minikube docker-env\)
