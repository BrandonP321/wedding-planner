# wedding-planner

## Environment Setup

### Pre-reqs

- Make sure you are using a bash terminal to run any documented commands. While this is not a requirement, these commands have only been tested in bash terminals and might not function properly in other terminals.

- Set account ID environment variable. This will be required by several other commands. Replace `<account ID>` with your ID.

```
AWS_ACCOUNT_ID=<account ID>
```

- Ensure you have the AWS CLI v2 installed and configured for your account

### 1. Set AWS CodeArtifact auth token environment variable

- Run this script to get an auth token for CodeArtifact set as an environment variable. This will allow you to connect to the CodeArtifact repo to install npm dependencies.

```
source bin/set-artifact-token.sh
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

### 4. Cleanup

After successfully publishing all required packages, comment out any changes made to .yarnrc.yml for locally installing. This ensures that all future installs use the CodeArtifact repo.
