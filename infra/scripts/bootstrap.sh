#!/bin/bash

# Add Helm repositories
echo "Adding Helm repositories..."
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo add jetstack https://charts.jetstack.io
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
helm repo update

# Create namespaces
echo "Creating namespaces..."
kubectl create namespace ingress-nginx --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace cert-manager --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace app --dry-run=client -o yaml | kubectl apply -f -

# Install ArgoCD (if not already installed)
echo "Installing ArgoCD..."
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD to be ready
echo "Waiting for ArgoCD to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd

# Apply ArgoCD applications
echo "Applying ArgoCD applications..."
kubectl apply -f argocd/apps/infrastructure.yaml
kubectl apply -f argocd/apps/monitoring.yaml
kubectl apply -f argocd/apps/backend.yaml
kubectl apply -f argocd/apps/frontend.yaml

# Wait for cert-manager to be ready before creating ClusterIssuer
echo "Waiting for cert-manager to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/cert-manager -n cert-manager
kubectl wait --for=condition=available --timeout=300s deployment/cert-manager-webhook -n cert-manager

# Create ClusterIssuer
echo "Creating ClusterIssuer..."
kubectl apply -f infrastructure/cert-manager/cluster-issuer.yaml

# Create ingress resource
echo "Creating ingress resource..."
kubectl apply -f infrastructure/ingress/ingress-resource.yaml

echo "Bootstrap complete!"
echo "Access ArgoCD UI with: kubectl port-forward svc/argocd-server -n argocd 8080:443"
echo "Initial password: $(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)"


kubectl port-forward svc/argocd-server -n argocd 8081:443 - admin - jeBaZAoI6mx5xCzu
kubectl port-forward svc/nginx-ingress-ingress-nginx-controller -n ingress-nginx 8000:80