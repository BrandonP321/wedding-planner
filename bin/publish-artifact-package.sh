#!/bin/bash

# Configuration
export DOMAIN_NAME="wp"
export REPOSITORY_NAME="WP-code-artifacts"
export AWS_REGION="us-east-1"
export PACKAGE=$1

# Authenticate with CodeArtifact
export aws codeartifact login --tool npm --domain $DOMAIN_NAME --repository $REPOSITORY_NAME --region $AWS_REGION

echo "Processing $PACKAGE..."

PACKAGE_DIR="node_modules/$PACKAGE"

if [ -d "$PACKAGE_DIR" ]; then
    cd $PACKAGE_DIR
    npm publish --registry https://$DOMAIN_NAME-$AWS_ACCOUNT_ID.d.codeartifact.$AWS_REGION.amazonaws.com/npm/$REPOSITORY_NAME/
else
    echo "Failed to fetch $PACKAGE. Skipping..."
fi

echo "Finished processing packages."
