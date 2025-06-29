# Monitoring Stack Guide - E-Commerce Platform

## 🎯 Overview
Your e-commerce platform uses a complete observability stack to monitor performance, health, and user behavior.

## 📊 Prometheus - Metrics Collection

### What is Prometheus?
- **Time-series database** that collects and stores metrics
- **Pull-based system** - scrapes metrics from your applications
- **Query language (PromQL)** for analyzing data

### How it Works in Your Project:
```
Frontend App → Metrics Endpoint (:8000/metrics) ← Prometheus scrapes every 15s
Backend API → Metrics Endpoint (:8000/metrics) ← Prometheus scrapes every 15s
MongoDB → Node Exporter → Metrics ← Prometheus scrapes
Kubernetes → kube-state-metrics ← Prometheus scrapes
```

### Key Metrics Collected:
- **Application**: Request count, response time, error rates
- **System**: CPU, memory, disk usage
- **Business**: Orders, user registrations, revenue
- **Infrastructure**: Pod status, node health

## 📈 Grafana - Visualization & Dashboards

### What is Grafana?
- **Visualization platform** that creates dashboards from Prometheus data
- **Alerting system** for notifications
- **Multi-datasource support** (Prometheus, Loki, Tempo)

### Your Grafana Setup:
- **URL**: http://grafana.sharkapp.local
- **Credentials**: admin / newpassword123
- **Datasources**: Prometheus, Loki, Tempo (pre-configured)

### Key Dashboards for E-Commerce:
1. **Application Performance**
   - API response times
   - Error rates by endpoint
   - Request volume

2. **Business Metrics**
   - Orders per minute
   - Revenue tracking
   - User activity

3. **Infrastructure Health**
   - Pod CPU/Memory usage
   - Database connections
   - Storage utilization

## 🔄 How They Work Together

### Data Flow:
```
Your Apps → Prometheus (collect) → Grafana (visualize) → Alerts (notify)
```

### Service Monitors (Configured):
```yaml
# Frontend monitoring
- name: sharkapp-frontend
  endpoints: [":8000/metrics"]
  interval: 15s

# Backend monitoring  
- name: sharkapp-backend
  endpoints: [":8000/metrics"]
  interval: 15s
```

## 🚀 Accessing Your Monitoring

### 1. Port Forward Grafana:
```bash
kubectl port-forward svc/prometheus-stack-dev-grafana 3000:80 -n dev
```
Then visit: http://localhost:3000

### 2. Port Forward Prometheus:
```bash
kubectl port-forward svc/prometheus-stack-dev-kube-prom-prometheus 9090:9090 -n dev
```
Then visit: http://localhost:9090

## 📋 Quick Health Check

### Verify Targets in Prometheus:
1. Go to Prometheus UI → Status → Targets
2. Check all endpoints are "UP"
3. Look for your frontend/backend services

### Create Your First Dashboard:
1. Login to Grafana
2. Create → Dashboard
3. Add Panel → Query: `rate(http_requests_total[5m])`
4. This shows request rate for your APIs

## 🎯 Next Steps
- Set up custom business metrics
- Create alerting rules
- Configure Loki for log aggregation
- Add distributed tracing with Tempo