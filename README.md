# E-Commerce Platform with DevSecOps + GitOps Pipeline

## DevSecOps + GitOps Pipeline Overview

![DevSecOps GitOps Pipeline](Final-DevSecOps-GitOps-Pipeline.gif)

Our comprehensive DevSecOps + GitOps pipeline integrates security, automation, and observability throughout the entire software delivery lifecycle. The pipeline includes:

- **🔄 CI Pipeline**: Developer → GitHub → Jenkins CI → OWASP → SonarQube → Trivy → Docker
- **🚀 CD Pipeline**: Jenkins CD → GitHub → ArgoCD → Kubernetes
- **📊 Monitoring & Alerting**: Prometheus/Grafana/Loki → Alertmanager → Email/Slack

## Table of Contents

- [Architecture](#architecture)
- [Observability Stack](#observability-stack)
- [Monitoring with Prometheus](#monitoring-with-prometheus)
- [Logging with Loki](#logging-with-loki)
- [Quick Start](#quick-start)
- [Log Queries](#log-queries)
- [Configuration](#configuration)
- [Dashboards](#dashboards)
- [Useful Links](#useful-links)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)

## Architecture

```mermaid
graph TD
    subgraph "Kubernetes Cluster"
        subgraph "Dev Namespace"
            FrontendDev["Frontend Pod"]
            BackendDev["Backend Pod"]
            
            subgraph "Observability Stack"
                PrometheusDev["Prometheus"]
                GrafanaDev["Grafana"]
                LokiDev["Loki"]
                PromtailDev["Promtail DaemonSet"]
            end
            
            FrontendDev -->|Logs| PromtailDev
            BackendDev -->|Logs| PromtailDev
            PromtailDev -->|Push Logs| LokiDev
            LokiDev -->|Query| GrafanaDev
            PrometheusDev -->|Metrics| GrafanaDev
        end
        
        subgraph "Prod Namespace"
            FrontendProd["Frontend Pod"]
            BackendProd["Backend Pod"]
            
            subgraph "Observability Stack"
                PrometheusProd["Prometheus"]
                GrafanaProd["Grafana"]
                LokiProd["Loki"]
                PromtailProd["Promtail DaemonSet"]
            end
            
            FrontendProd -->|Logs| PromtailProd
            BackendProd -->|Logs| PromtailProd
            PromtailProd -->|Push Logs| LokiProd
            LokiProd -->|Query| GrafanaProd
            PrometheusProd -->|Metrics| GrafanaProd
        end
        
        subgraph "ArgoCD Namespace"
            ArgoCD["ArgoCD"]
        end
        
        ArgoCD -->|Deploy| FrontendDev
        ArgoCD -->|Deploy| BackendDev
        ArgoCD -->|Deploy| LokiDev
        ArgoCD -->|Deploy| PromtailDev
        ArgoCD -->|Deploy| PrometheusDev
        ArgoCD -->|Deploy| GrafanaDev
        
        ArgoCD -->|Deploy| FrontendProd
        ArgoCD -->|Deploy| BackendProd
        ArgoCD -->|Deploy| LokiProd
        ArgoCD -->|Deploy| PromtailProd
        ArgoCD -->|Deploy| PrometheusProd
        ArgoCD -->|Deploy| GrafanaProd
    end
    
    User["User/Browser"] -->|HTTP| FrontendDev
    User -->|HTTP| FrontendProd
    FrontendDev -->|API Calls| BackendDev
    FrontendProd -->|API Calls| BackendProd
    
    Developer["Developer"] -->|View Logs| GrafanaDev
    Developer -->|View Metrics| GrafanaDev
    SRE["SRE Team"] -->|View Logs| GrafanaProd
    SRE -->|View Metrics| GrafanaProd
```

### Log Flow Architecture

```mermaid
flowchart LR
    A[Application Pods] -->|Write logs to stdout| B[Container Runtime]
    B -->|Write to| C[/var/log/pods/]
    D[Promtail DaemonSet] -->|Read from| C
    D -->|Parse & Label| D
    D -->|Push| E[Loki]
    E -->|Store & Index| E
    F[Grafana] -->|Query| E
    G[User] -->|View| F
```

### Prometheus Metrics Flow

```mermaid
flowchart TD
    subgraph "Metrics Collection"
        A[Application Pods] -->|Expose /metrics| B[HTTP Endpoints]
        C[Node Exporter] -->|System Metrics| D[Node Metrics]
        E[Kube State Metrics] -->|K8s Object Metrics| F[Cluster Metrics]
    end
    
    subgraph "Prometheus Server"
        G[Prometheus] -->|Scrape| B
        G -->|Scrape| D
        G -->|Scrape| F
        G -->|Store| H[Time Series DB]
        G -->|Evaluate| I[Alert Rules]
    end
    
    subgraph "Visualization & Alerting"
        J[Grafana] -->|Query| H
        K[AlertManager] -->|Receive| I
        K -->|Send| L[Notifications]
    end
    
    M[Users] -->|View Dashboards| J
    N[SRE Team] -->|Receive Alerts| L
    
    style A fill:#e1f5fe
    style G fill:#fff3e0
    style J fill:#f3e5f5
    style K fill:#ffebee
```

### ServiceMonitor Discovery

```mermaid
flowchart LR
    A[ServiceMonitor CRD] -->|Defines| B[Scrape Config]
    C[Prometheus Operator] -->|Watches| A
    C -->|Generates| D[Prometheus Config]
    E[Prometheus Server] -->|Loads| D
    E -->|Scrapes| F[Target Services]
    F -->|Returns| G[Metrics Data]
    E -->|Stores| H[TSDB]
```

## Observability Stack

Our e-commerce platform includes a comprehensive observability stack:

- **📈 Metrics**: Prometheus + Grafana for application and infrastructure monitoring
- **📜 Logs**: Loki + Promtail + Grafana for centralized log aggregation
- **🔍 Traces**: Coming soon with Jaeger integration!
- **🚨 Alerts**: Prometheus AlertManager for proactive monitoring
- **📄 Dashboards**: Pre-built Grafana dashboards for quick insights

## Monitoring with Prometheus

![Prometheus Architecture](https://prometheus.io/assets/architecture.png)

We've implemented Prometheus for comprehensive metrics collection:

- **Prometheus Server**: Metrics collection and storage
- **Node Exporter**: System-level metrics
- **Kube State Metrics**: Kubernetes object metrics
- **ServiceMonitors**: Automatic service discovery
- **AlertManager**: Alert routing and notifications

### Key Metrics

- ✅ Application performance (response time, throughput)
- ✅ Infrastructure health (CPU, memory, disk)
- ✅ Kubernetes cluster state
- ✅ Custom business metrics
- ✅ SLI/SLO monitoring

### Common PromQL Queries

```promql
# CPU usage by pod
rate(container_cpu_usage_seconds_total[5m])

# Memory usage percentage
(container_memory_working_set_bytes / container_spec_memory_limit_bytes) * 100

# HTTP request rate
rate(http_requests_total[5m])

# Error rate percentage
(rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])) * 100

# 95th percentile response time
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

## Logging with Loki

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

## Quick Start

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

## Log Queries

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

## Configuration

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

## Dashboards

Access pre-built dashboards:

- Application Overview: `/d/app-overview`
- Error Monitoring: `/d/error-monitoring`
- Performance Metrics: `/d/performance`

## Useful Links

### Prometheus & Monitoring
- [Prometheus Documentation](https://prometheus.io/docs/)
- [PromQL Query Language](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/)
- [Prometheus Operator](https://prometheus-operator.dev/)
- [AlertManager Configuration](https://prometheus.io/docs/alerting/latest/alertmanager/)

### Loki & Logging
- [Grafana Loki Documentation](https://grafana.com/docs/loki/latest/)
- [LogQL Query Language](https://grafana.com/docs/loki/latest/logql/)
- [Kubernetes Logging Best Practices](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
- [Promtail Configuration](https://grafana.com/docs/loki/latest/clients/promtail/configuration/)

### Kubernetes & Observability
- [Kubernetes Monitoring Guide](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-usage-monitoring/)
- [SRE Best Practices](https://sre.google/sre-book/table-of-contents/)
- [Observability Patterns](https://www.oreilly.com/library/view/observability-engineering/9781492076438/)

## Troubleshooting

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| No logs appearing | Check Promtail pods: `kubectl get pods -n dev -l app=promtail` |
| Missing labels | Verify configmap: `kubectl describe configmap promtail-config -n dev` |
| Query timeout | Adjust time range or add filters to narrow results |

## Project Structure

```
e-commerce/
├── frontend/                    # React frontend application
├── backend/                     # Node.js API backend
├── setup.sh                    # One-click deployment script
├── docs/                       # Documentation
│   └── infrastructure-diagram.md   # Detailed architecture diagrams
└── infra/                      # Infrastructure as Code
    ├── addons/                 # Helm charts for services
    │   ├── loki/               # Logging stack (Loki + Promtail)
    │   ├── prometheus-stack/   # Metrics stack (Prometheus + Grafana)
    │   ├── backend/            # Backend application chart
    │   ├── frontend/           # Frontend application chart
    │   └── ingress/            # Ingress controller
    └── config/                 # Environment-specific configurations
        ├── dev/                # Development environment
        │   ├── app/            # Application configs
        │   └── monitoring-system/ # Observability configs
        └── prod/               # Production environment
            ├── app/            # Application configs
            └── monitoring-system/ # Observability configs
```