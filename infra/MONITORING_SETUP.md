# Monitoring Stack Setup

## Overview
This document describes the streamlined monitoring setup for the e-commerce platform using Grafana and Prometheus.

## Components

### 1. Prometheus Stack (Primary Monitoring)
- **Location**: `infra/addons/prometheus-stack/`
- **Includes**: Prometheus, Grafana, AlertManager, Node Exporter
- **Configuration**: `values.yaml`

#### Key Features:
- Prometheus for metrics collection
- Grafana for visualization (integrated)
- Service monitors for application monitoring
- Persistent storage for both Prometheus and Grafana

### 2. Loki (Log Aggregation)
- **Location**: `infra/addons/loki/`
- **Purpose**: Centralized logging
- **Configuration**: Simplified and cleaned up

### 3. Additional Exporters
- **Process Exporter**: `infra/addons/process-exporter/`
- **PID Exporter**: `infra/addons/pid-exporter/`

## Access URLs
- **Grafana**: http://grafana.sharkapp.local
- **Prometheus**: Available through Grafana datasources

## Datasources Configuration
- **Prometheus**: `http://prometheus-stack-dev-kube-prom-prometheus.dev.svc.cluster.local:9090`
- **Loki**: `http://loki-dev-gateway.dev.svc.cluster.local:80`
- **Tempo**: `http://grafana-tempo-dev.dev.svc.cluster.local:3100`

## Service Monitors
Configured for:
- Frontend application metrics
- Backend application metrics
- System-level metrics via exporters

## Cleanup Actions Performed
1. Removed redundant standalone Grafana addon
2. Deleted backup files (.bak)
3. Removed temporary configuration files
4. Cleaned up commented code blocks
5. Consolidated datasource configurations
6. Enabled service monitors for applications

## Deployment
Use ArgoCD applications to deploy the monitoring stack:
```bash
kubectl apply -f infra/config/application.yaml
```

## Default Credentials
- **Grafana Admin**: admin / newpassword123 (change in production)