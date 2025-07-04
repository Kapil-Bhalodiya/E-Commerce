# E-Commerce Platform with Observability

## Table of Contents

- [Architecture](#architecture)
- [Observability Stack](#-observability-stack)
- [Logging with Loki](#-logging-with-loki)
- [Quick Start](#-quick-start)
- [Log Queries](#-log-queries)
- [Configuration](#-configuration)
- [Dashboards](#-dashboards)
- [Useful Links](#-useful-links)
- [Troubleshooting](#️-troubleshooting)
- [Project Structure](#-project-structure)

## Architecture

[View detailed infrastructure diagram](docs/infrastructure-diagram.md)

![Architecture Overview](https://miro.medium.com/v2/resize:fit:1400/1*Mh8G2RN8CJACiAu11_eXJA.png)

## 📊 Observability Stack

Our e-commerce platform includes a comprehensive observability stack:

- **Metrics**: Prometheus + Grafana
- **Logs**: Loki + Promtail + Grafana
- **Traces**: Coming soon!

## 🔍 Logging with Loki

![Loki Architecture](https://grafana.com/docs/loki/latest/get-started/loki-architecture.png)

We've implemented Grafana Loki for centralized logging with:

- **Loki**: Log storage and query engine
- **Promtail**: Log collector on each node
- **Grafana**: Visualization dashboard

### Key Features

- ✅ Multi-environment support (dev/prod)
- ✅ Application-specific log streams
- ✅ Consistent labeling for easy filtering
- ✅ Resource-efficient storage

## 🚀 Quick Start

### One-Click Setup

Run our setup script to deploy the entire stack:

```bash
./setup.sh
```

### Manual Setup

1. Deploy infrastructure:
```bash
kubectl apply -f infra/config/dev/values.yaml
```

2. Access Grafana:
```
Username: admin
Password: devadmin123 (dev) or SecurePassword123! (prod)
```

## 📝 Log Queries

![Grafana Logs](https://grafana.com/static/img/logs/explore-logs.png)

### Common Queries

```
# All backend logs
{app="backend"}

# Frontend errors
{app="frontend"} |= "error"

# API requests with status code
{app="backend"} |~ "api|endpoint" | json | status_code >= 400
```

## 🔧 Configuration

### Development Environment

```yaml
# Minimal resources for local development
loki:
  resources:
    limits:
      cpu: 200m
      memory: 256Mi
```

### Production Environment

```yaml
# Production-grade setup
loki:
  loki:
    limits_config:
      retention_period: 30d
  singleBinary:
    resources:
      limits:
        cpu: 1000m
        memory: 2Gi
```

## 📈 Dashboards

Access pre-built dashboards:

- Application Overview: `/d/app-overview`
- Error Monitoring: `/d/error-monitoring`
- Performance Metrics: `/d/performance`

## 🔗 Useful Links

- [Grafana Loki Documentation](https://grafana.com/docs/loki/latest/)
- [LogQL Query Language](https://grafana.com/docs/loki/latest/logql/)
- [Kubernetes Logging Best Practices](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
- [Promtail Configuration](https://grafana.com/docs/loki/latest/clients/promtail/configuration/)

## 🛠️ Troubleshooting

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| No logs appearing | Check Promtail pods: `kubectl get pods -n dev -l app=promtail` |
| Missing labels | Verify configmap: `kubectl describe configmap promtail-config -n dev` |
| Query timeout | Adjust time range or add filters to narrow results |

## 📦 Project Structure

```
e-commerce/
├── frontend/         # Angular frontend application
├── backend/          # Node.js API backend
└── infra/           # Infrastructure configuration
    ├── addons/      # Kubernetes addons
    │   ├── loki/    # Logging stack
    │   └── prometheus-stack/  # Metrics stack
    └── config/      # Environment configurations
        ├── dev/     # Development environment
        └── prod/    # Production environment
```