#!/bin/bash
# E-Commerce Platform Setup Script

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}   E-Commerce Platform Setup Script      ${NC}"
echo -e "${GREEN}=========================================${NC}"

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}Error: kubectl is not installed. Please install kubectl first.${NC}"
    exit 1
fi

# Check if ArgoCD is installed
if ! kubectl get namespace argocd &> /dev/null; then
    echo -e "${YELLOW}ArgoCD namespace not found. Installing ArgoCD...${NC}"
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
    echo -e "${GREEN}ArgoCD installed successfully!${NC}"
else
    echo -e "${GREEN}ArgoCD is already installed.${NC}"
fi

# Wait for ArgoCD to be ready
echo -e "${YELLOW}Waiting for ArgoCD to be ready...${NC}"
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd
echo -e "${GREEN}ArgoCD is ready!${NC}"

# Create namespaces
echo -e "${YELLOW}Creating namespaces...${NC}"
kubectl create namespace dev --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace prod --dry-run=client -o yaml | kubectl apply -f -
echo -e "${GREEN}Namespaces created!${NC}"

# Deploy infrastructure
echo -e "${YELLOW}Deploying infrastructure...${NC}"

# Deploy Prometheus Stack
echo -e "${YELLOW}Deploying Prometheus Stack...${NC}"
kubectl apply -f infra/config/dev/monitoring-system/prometheus-stack/values.yaml
echo -e "${GREEN}Prometheus Stack deployed!${NC}"

# Deploy Loki
echo -e "${YELLOW}Deploying Loki...${NC}"
kubectl apply -f infra/config/dev/monitoring-system/loki/values.yaml
echo -e "${GREEN}Loki deployed!${NC}"

# Deploy Backend
echo -e "${YELLOW}Deploying Backend...${NC}"
kubectl apply -f infra/config/dev/app/backend/values.yaml
echo -e "${GREEN}Backend deployed!${NC}"

# Deploy Frontend
echo -e "${YELLOW}Deploying Frontend...${NC}"
kubectl apply -f infra/config/dev/app/frontend/values.yaml
echo -e "${GREEN}Frontend deployed!${NC}"

# Wait for deployments to be ready
echo -e "${YELLOW}Waiting for deployments to be ready...${NC}"
kubectl wait --for=condition=available --timeout=300s deployment/backend-dev -n dev
kubectl wait --for=condition=available --timeout=300s deployment/frontend-dev -n dev
echo -e "${GREEN}Deployments are ready!${NC}"

# Get access URLs
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}   Access Information                    ${NC}"
echo -e "${GREEN}=========================================${NC}"

# Get Grafana URL
GRAFANA_URL=$(kubectl get ingress -n dev grafana-dev -o jsonpath='{.spec.rules[0].host}' 2>/dev/null || echo "dev.grafana.local")
echo -e "${YELLOW}Grafana URL:${NC} http://$GRAFANA_URL"
echo -e "${YELLOW}Grafana Credentials:${NC} admin / devadmin123"

# Get Frontend URL
FRONTEND_URL=$(kubectl get ingress -n dev frontend-dev -o jsonpath='{.spec.rules[0].host}' 2>/dev/null || echo "dev.frontend.local")
echo -e "${YELLOW}Frontend URL:${NC} http://$FRONTEND_URL"

# Get Backend URL
BACKEND_URL=$(kubectl get ingress -n dev backend-dev -o jsonpath='{.spec.rules[0].host}' 2>/dev/null || echo "dev.backend.local")
echo -e "${YELLOW}Backend API URL:${NC} http://$BACKEND_URL"

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}   Setup Complete!                       ${NC}"
echo -e "${GREEN}=========================================${NC}"

echo -e "${YELLOW}To view logs in Grafana:${NC}"
echo -e "1. Open http://$GRAFANA_URL"
echo -e "2. Login with admin / devadmin123"
echo -e "3. Go to Explore"
echo -e "4. Select Loki data source"
echo -e "5. Try a query like {namespace=\"dev\"}"

echo -e "${GREEN}Happy logging!${NC}"