#!/bin/bash

# Deploy Prometheus Stack (includes Grafana)
echo "Deploying Prometheus Stack..."
helm upgrade --install prometheus-stack-dev ./infra/addons/prometheus-stack \
  --namespace dev \
  --create-namespace \
  --values ./infra/config/dev/monitoring-system/prometheus-stack/values.yaml

# Deploy Loki
echo "Deploying Loki..."
helm upgrade --install loki-dev ./infra/addons/loki \
  --namespace dev \
  --values ./infra/config/dev/monitoring-system/loki/values.yaml

# Deploy Process Exporter
echo "Deploying Process Exporter..."
helm upgrade --install process-exporter-dev ./infra/addons/process-exporter \
  --namespace dev \
  --values ./infra/config/dev/monitoring-system/process-exporter/values.yaml

echo "Monitoring stack deployed!"
echo "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=grafana -n dev --timeout=300s