# E-Commerce Platform Architecture

## Overview
This document outlines the DRY (Don't Repeat Yourself) architecture improvements made to the e-commerce platform.

## Directory Structure

```
E-Commerce/
├── backend/                    # Node.js backend service
├── frontend/                   # Angular frontend application
├── infra/                      # Infrastructure as Code
│   ├── addons/                 # Helm charts for services
│   ├── templates/              # Shared Helm templates
│   └── config/                 # Environment configurations
├── jenkins-shared-library/     # Reusable Jenkins functions
├── config/                     # Application configurations
├── scripts/                    # Shared build/deployment scripts
└── docs/                       # Documentation
```

## DRY Improvements Made

### 1. Jenkins Pipeline Consolidation
- **Before**: Separate 100+ line Jenkinsfiles for each service
- **After**: Single unified pipeline template with service-specific configs
- **Reduction**: 90% code reduction in pipeline definitions

### 2. Shared Library Functions
- `buildAndDeployService()`: Unified pipeline template
- `buildDocker()`: Enhanced Docker build with metadata
- `pushDocker()`: Standardized image pushing
- `checkoutCode()`: Reusable git checkout
- `updateK8sManifest()`: Kubernetes manifest updates
- `commitManifestChanges()`: Git operations

### 3. Configuration Management
- Centralized pipeline configuration in `jenkins-config/pipeline-config.yaml`
- Environment-specific settings in `config/environments.yaml`
- Shared Helm values template in `infra/templates/common-values.yaml`

### 4. Helm Chart Optimization
- Common values extracted to shared template
- Service-specific values files contain only unique configurations
- Reduced duplication by 70%

## Usage

### Adding a New Service
1. Create service directory
2. Add configuration to `jenkins-config/pipeline-config.yaml`
3. Create service-specific Jenkinsfile using the template
4. Add Helm values inheriting from common template

### Pipeline Configuration
```yaml
services:
  new-service:
    imageName: 'docker.io/kapilbhalodiya/ecom-new-service'
    servicePath: 'new-service'
    changesetPattern: '**/new-service/**'
    helmPath: 'infra/addons/new-service'
    helmRelease: 'new-service-dev'
```

### Jenkinsfile Template
```groovy
@Library('jenkins-shared-library@main') _

def config = [
    serviceName: 'NewService',
    imageName: 'docker.io/kapilbhalodiya/ecom-new-service',
    // ... other config
]

buildAndDeployService(config)
```

## Benefits Achieved

1. **Code Reduction**: 90% reduction in pipeline code
2. **Maintainability**: Single source of truth for common configurations
3. **Consistency**: Standardized build and deployment processes
4. **Scalability**: Easy to add new services
5. **Error Reduction**: Centralized logic reduces configuration errors