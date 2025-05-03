#!/bin/bash
set -e

# Validate Helm charts
helm lint devops/charts/frontend
helm lint devops/charts/backend
helm lint devops/charts/monitoring

# Validate Kubernetes manifests
kubectl apply -f devops/argocd/ --dry-run=client