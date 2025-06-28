# E-Commerce Platform Makefile
.PHONY: help build-backend build-frontend build-all push-backend push-frontend push-all clean

# Default registry and tag
REGISTRY ?= docker.io/kapilbhalodiya
TAG ?= latest
BUILD_DATE := $(shell date -u +'%Y-%m-%dT%H:%M:%SZ')
VCS_REF := $(shell git rev-parse --short HEAD)

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build-backend: ## Build backend Docker image
	@echo "🏗️ Building backend service..."
	docker build \
		--build-arg BUILD_DATE=$(BUILD_DATE) \
		--build-arg VCS_REF=$(VCS_REF) \
		--build-arg VERSION=$(TAG) \
		-t $(REGISTRY)/ecom-backend:$(TAG) \
		-t $(REGISTRY)/ecom-backend:latest \
		./backend/
	@echo "✅ Backend build completed"

build-frontend: ## Build frontend Docker image
	@echo "🏗️ Building frontend service..."
	docker build \
		--build-arg BUILD_DATE=$(BUILD_DATE) \
		--build-arg VCS_REF=$(VCS_REF) \
		--build-arg VERSION=$(TAG) \
		-t $(REGISTRY)/ecom-frontend:$(TAG) \
		-t $(REGISTRY)/ecom-frontend:latest \
		./frontend/
	@echo "✅ Frontend build completed"

build-all: build-backend build-frontend ## Build all services

push-backend: ## Push backend Docker image
	@echo "🚀 Pushing backend image..."
	docker push $(REGISTRY)/ecom-backend:$(TAG)
	docker push $(REGISTRY)/ecom-backend:latest
	@echo "✅ Backend push completed"

push-frontend: ## Push frontend Docker image
	@echo "🚀 Pushing frontend image..."
	docker push $(REGISTRY)/ecom-frontend:$(TAG)
	docker push $(REGISTRY)/ecom-frontend:latest
	@echo "✅ Frontend push completed"

push-all: push-backend push-frontend ## Push all services

clean: ## Clean up Docker images
	@echo "🧹 Cleaning up Docker images..."
	docker image prune -f
	@echo "✅ Cleanup completed"

dev-setup: ## Setup development environment
	@echo "🔧 Setting up development environment..."
	cd backend && npm install
	cd frontend && npm install
	@echo "✅ Development setup completed"

test-backend: ## Run backend tests
	@echo "🧪 Running backend tests..."
	cd backend && npm test

test-frontend: ## Run frontend tests
	@echo "🧪 Running frontend tests..."
	cd frontend && npm test

lint: ## Run linting for all services
	@echo "🔍 Running linting..."
	cd backend && npm run lint || echo "Backend linting not configured"
	cd frontend && npm run lint || echo "Frontend linting not configured"