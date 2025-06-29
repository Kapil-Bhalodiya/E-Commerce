# Loki - Log Aggregation Guide

## 🎯 What is Loki?
- **Log aggregation system** like ELK stack but simpler
- **Integrates perfectly** with Grafana and Prometheus
- **Stores logs efficiently** with labels, not full-text indexing

## 🔄 How Loki Works in Your Project

### Architecture:
```
Frontend Logs → Promtail → Loki → Grafana (visualization)
Backend Logs  → Promtail → Loki → Grafana (visualization)
Pod Logs      → Promtail → Loki → Grafana (visualization)
```

### Components:
- **Loki**: Log storage and query engine
- **Promtail**: Log collector (like Filebeat)
- **Grafana**: Log visualization and search

## 🚀 Deploy Loki

### Check Current Status:
```bash
kubectl get pods -n dev | findstr loki
```

### Deploy if Missing:
```bash
kubectl apply -f infra/config/application.yaml
```

## 📊 Configure Log Collection

### Your Applications Need to Output Structured Logs:

#### Backend (Node.js) - Update logger:
```javascript
// src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ 
      filename: '/var/log/app/app.log' 
    })
  ]
});

module.exports = logger;
```

#### Frontend (Angular) - Console logs are auto-collected

## 🔍 Access Logs in Grafana

### 1. Open Grafana:
```bash
kubectl port-forward svc/prometheus-stack-dev-grafana 3000:80 -n dev
```

### 2. Go to Explore → Select Loki datasource

### 3. Query Examples:
```logql
# All logs from backend
{app="backend-dev"}

# Error logs only
{app="backend-dev"} |= "ERROR"

# Logs from specific pod
{pod="backend-dev-7dd55787d7-bbfqf"}

# Rate of errors per minute
rate({app="backend-dev"} |= "ERROR"[1m])
```

## 📈 Create Log Dashboard

### Add Log Panel to Grafana:
1. Create Dashboard → Add Panel
2. Select Loki datasource
3. Query: `{app="backend-dev"}`
4. Visualization: Logs

### Useful Log Queries:
- **API Errors**: `{app="backend-dev"} |= "error" |= "api"`
- **Database Issues**: `{app="backend-dev"} |= "database" |= "error"`
- **User Actions**: `{app="frontend-dev"} |= "user"`