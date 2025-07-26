# E-Commerce Platform Infrastructure Diagram

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

## Log Flow Details

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

## Component Details

### Logging Components

- **Loki**: Log aggregation system
- **Promtail**: Log collector that runs on each node
- **Grafana**: Visualization platform for logs and metrics

### Application Components

- **Frontend**: React-based web interface
- **Backend**: Node.js API service
- **Database**: MongoDB database (not shown in diagram)

### Infrastructure Components

- **ArgoCD**: GitOps continuous delivery tool
- **Kubernetes**: Container orchestration platform