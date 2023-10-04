#!/bin/bash
export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain wp --domain-owner 757269603777 --query authorizationToken --output text`