#!/bin/bash

if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <addon name> <namespace> <env>"
    exit 1
fi
echo "Addon: $1" 
echo "Namespace: $2"
echo "Env: $3"

ADDON="$1"
NAMESPACE="$2"
ENV="$3"
helm dependency update addons/${ADDON}
helm template \
    --values config/${ENV}/values.yaml \
    --values config/${ENV}/${NAMESPACE}/${ADDON}/values.yaml \
    --set "global.environment=${ENV},global.nameOverride=${ADDON},global.namespace=${NAMESPACE}" \
    --release-name ${ADDON}-${ENV} addons/${ADDON} \
    --namespace ${NAMESPACE}