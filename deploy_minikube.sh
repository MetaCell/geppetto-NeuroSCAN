#!/bin/bash

eval $(minikube docker-env)

# Ensure that namespace exists
kubectl create ns geppetto-yale

# Install helm chart
helm upgrade --set ingress.ssl_redirect=false geppetto-yale deployment/helm -n geppetto-yale --install --reset-values
