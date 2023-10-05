# wedding-planner

## Noteworthy tools & technologies

These are some of the tools & technologies I incorporated into this app that I'd like to call out.

#### Infrastructure & API

1. **AWS CodePipeline & CodeBuild**: CI/CD pipeline with automated builds, tests, and deployments
2. **AWS CodeArtifact**: Stores npm dependencies to control dependency bandwidth quotas
3. **AWS CloudWatch**: Used to monitor application, API and resource health
4. **AWS S3**: Asset and log storage
5. **AWS CloudFront**: Edge optimizes react app & API
6. **AWS CloudFormation**: Provisions all app related AWS resources
7. **AWS WAF**: Provides app & API with a layer of protection against DDOS attacks
8. **AWS Lambda**: Provides serverless handlers for all API endpoints. Also used with S3 & CloudFront to provide an image delivery API that allows for on-the-spot editing & transformations of images.
9. **AWS API Gateway**: Integrates with AWS Lambda to create the REST API.
10. **AWS CDK**: Provides centralized modeling and provisioning of all AWS resources
11. **Monorepo**: Makes code sharing between all packages extremely simple, boosting productivity.

#### Web React app

1. **React & TypeScript**
2. **Redux**: Global state management solution
3. **i18next & Locize**: Localizes the app

## Environment Setup

### Pre-reqs

- Make sure you are using a bash terminal to run any documented commands. While this is not a requirement, these commands have only been tested in bash terminals and might not function properly in other terminals.

- Set account ID environment variable. This will be required by several other commands. Replace `<account ID>` with your ID.

```
AWS_ACCOUNT_ID=<account ID>
```

- Ensure you have the AWS CLI v2 installed and configured for your account

### 1. Set AWS CodeArtifact auth environment variables

- Add the following to your `~/.bashrc`. This ensures that you have the necessary permissions to interact with the CodeArtifact repo each time a new terminal instance is created.

```
export WP_CODEARTIFACT_ACCOUNT_ID="757269603777"
export WP_CODEARTIFACT_DOMAIN_NAME="wp"
export WP_CODEARTIFACT_REPOSITORY_NAME="WP-code-artifacts"
export WP_CODEARTIFACT_AWS_REGION="us-east-1"

export WP_CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain $WP_CODEARTIFACT_DOMAIN_NAME --domain-owner $WP_CODEARTIFACT_ACCOUNT_ID --query authorizationToken --output text`
```

### 2. Install

Now that you've set up authentication with the AWS CodeArtifact repo, you should be able to install the npm dependencies.

```
yarn install
```

## Publish custom external packages to CodeArtifact repo

Follow these steps to publish an external package that requires it's own npm scope, such as fontawesome, to the CodeArtifact repo.

### 1. Configure local environment

You'll need to configure your local environment to install the package from the package's npm registry. For example, here is the .yarnrc.yml local config for fontawesome:

```
npmScopes:
  fortawesome:
    npmRegistryServer: https://npm.fontawesome.com/
    npmAlwaysAuth: true
    npmAuthToken: "..."
```

### 2. Install package

Now install the package normally using `yarn install`.

### 3. Publish package to CodeArtifact

Run the following script to publish the package to the CodeArtifact repo, replacing <package_name> with the name of the package.

```
source bin/publish-artifact-package.sh <package_name>
```

### 4. Refresh yarn.lock

You now need to delete and re-create the `yarn.lock` file in order to set the registry url for each of the new packages as the CodeArtifact repo.

```
rm -rf yarn.lock && yarn install
```

### 5. Cleanup

After successfully publishing all required packages, comment out any changes made to .yarnrc.yml for locally installing. This ensures that all future installs use the CodeArtifact repo.
