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

- Run this script to get an auth token for CodeArtifact and set it as an environment. This will allow you to connect to the CodeArtifact repo to install npm dependencies.

```
source bin/set-artifact-token.sh
```

### 2. Install

Now that you've set up authentication with the AWS CodeArtifact repo, you should be able to install the npm dependencies.

```
yarn install
```
