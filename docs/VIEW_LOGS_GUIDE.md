# 📊 How to View Logs in Grafana

## Step 1: Access Grafana
```bash
kubectl port-forward svc/prometheus-stack-dev-grafana 3000:80 -n dev
```
Open: http://localhost:3000
Login: admin / newpassword123

## Step 2: Go to Explore
1. Click the **Explore** icon (compass) in left sidebar
2. Select **Loki** from datasource dropdown (top-left)

## Step 3: Query Your Logs

### Basic Queries:
```logql
# All logs from dev namespace
{namespace="dev"}

# Backend application logs
{app="backend-dev"}

# Frontend application logs  
{app="frontend-dev"}

# Specific pod logs
{pod="backend-dev-7dd55787d7-bbfqf"}
```

### Filter Logs:
```logql
# Error logs only
{app="backend-dev"} |= "error"

# API request logs
{app="backend-dev"} |= "POST" |= "/api"

# Database errors
{app="backend-dev"} |= "database" |= "error"
```

## Step 4: Create Log Dashboard

### Add Log Panel:
1. Go to **Dashboards** → **New Dashboard**
2. Click **Add Panel**
3. Select **Loki** as datasource
4. Enter query: `{namespace="dev"}`
5. Change visualization to **Logs**
6. Save panel

### Useful Log Panels:
- **Error Rate**: `rate({app="backend-dev"} |= "error"[5m])`
- **Request Volume**: `rate({app="backend-dev"} |= "POST"[1m])`
- **Live Logs**: `{app="backend-dev"}`