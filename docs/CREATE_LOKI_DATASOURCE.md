# 🔗 Create Loki Datasource in Grafana

## Step 1: Access Grafana
- URL: http://localhost:3000 (or your port)
- Login: admin / newpassword123

## Step 2: Add Loki Datasource

### Navigate to Datasources:
1. Click **⚙️ Configuration** (gear icon) in left sidebar
2. Click **Data Sources**
3. Click **Add data source**
4. Select **Loki**

### Configure Loki Datasource:
```
Name: Loki
URL: http://loki-gateway.dev.svc.cluster.local:80
```

**OR if that doesn't work, use:**
```
URL: http://loki-gateway:80
```

### Settings:
- **Access**: Server (default)
- **HTTP Method**: GET
- Leave other settings as default

### Click "Save & Test"
- Should show: "Data source connected and labels found"

## Step 3: Alternative URLs to Try

If the above doesn't work, try these URLs in order:

1. `http://loki-gateway.dev.svc.cluster.local:80`
2. `http://loki-gateway:80` 
3. `http://loki-read.dev.svc.cluster.local:3100`
4. `http://loki-read:3100`

## Step 4: Test the Connection

### Go to Explore:
1. Click **🧭 Explore** (compass icon)
2. Select **Loki** from dropdown
3. Try query: `{namespace="dev"}`
4. Click **Run Query**

You should see logs from your dev namespace!