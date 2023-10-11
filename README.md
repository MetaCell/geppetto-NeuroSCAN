# Geppetto - NeuroSCAN & PromoterDB

The Yale NeuroSCAN &amp; Promoter DB Project

## Folder Structure

* `backend/` strapi - headless CMS
* `frontend/` React application composed of NeuroSCAN and PromoterDB application
* `deployment/` Helm chart and Codefresh pipeline definition

## Install and deploy

### Prerequisites

The Yale deployment is built on top of [CloudHarness](https://github.com/MetaCell/cloud-harness).
The deployment process is based on Python 3.7+ scripts. It is recommended to setup a virtual 
environment first.

With conda: 
```bash
conda create --name yale python=3.7
conda activate yale
```

To install CloudHarness:

```
git clone https://github.com/MetaCell/cloud-harness.git
cd cloud-harness
pip install -r requirements.txt
```

## Local Development

Follow the respective README in the `frontend` and `backend` project to start up a development server for each project.

The default configuration is already set up so that no modification of ENV variables or configuration is required.

The first time you start up StrapiCMS you will need to create an admin account.

## Minikube

Optionally, you can also deploy to a local minikube cluster to test any changes in context of Kubernetes.

Two scripts are available to take off some work:

* `build.sh` - builds the required Docker images
* `deploy_minikube.sh` - installs the helm chart, located in `deployment` folder, in the minikube cluster

## Deployment

A commit to development branch will trigger the deployment pipeline in Codefresh for the development stage.


