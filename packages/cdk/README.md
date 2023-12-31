# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `yarn build` compile typescript to js
- `yarn watch` watch for changes and compile
- `yarn test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Pre-Req Steps

### 1.) Register domain and create hosted zone

Register a new domain through route53, which will automatically create a hosted zone.

### 2.) Add github oauth token to secrets manager

In AWS Secrets Manager, create a new secret named `github-token`. Set your personal github token as the value for this secret.
