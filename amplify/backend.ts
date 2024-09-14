import { defineBackend } from "@aws-amplify/backend";
import { Stack } from "aws-cdk-lib";
import {
    Cors,
    LambdaIntegration,
    RestApi,
    MethodLoggingLevel,
    AuthorizationType
} from "aws-cdk-lib/aws-apigateway";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { myApiFunction } from "./functions/api-function/resource";

const backend = defineBackend({
    myApiFunction,
});

// create a new API stack
const apiStack = backend.createStack("api-stack");

// create a new REST API
const myRestApi = new RestApi(apiStack, "RestApi", {
    restApiName: "myRestApi",
    deploy: true,
    deployOptions: {
        stageName: "dev",
        loggingLevel: MethodLoggingLevel.INFO, // Enable logging for debugging
    },
    defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
        allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
        allowHeaders: Cors.DEFAULT_HEADERS, // Specify only the headers you need to allow
    }, defaultMethodOptions: { authorizationType: AuthorizationType.NONE },
});

// create a new Lambda integration
const lambdaIntegration = new LambdaIntegration(
    backend.myApiFunction.resources.lambda
);

// create a new resource path for chat interactions
const chatPath = myRestApi.root.addResource("chat");

// add POST method to the chat resource path
chatPath.addMethod("POST", lambdaIntegration, {
    authorizationType: AuthorizationType.NONE,
});

// create a new IAM policy to allow Invoke access to the API and Bedrock model
const apiRestPolicy = new Policy(apiStack, "RestApiPolicy", {
    statements: [
        new PolicyStatement({
            actions: ["execute-api:Invoke"],
            resources: [
                `${myRestApi.arnForExecuteApi("*", "/chat", "dev")}`,
            ],
        }),
        new PolicyStatement({
            actions: ["bedrock:InvokeModel"],
            resources: [
                "arn:aws:bedrock:us-east-1::foundation-model/ai21.j2-ultra-v1",
            ],
        }),
    ],
});

// Attach the policy to the Lambda function's role directly
const lambdaExecutionRole = backend.myApiFunction.resources.lambda.role!;
lambdaExecutionRole.attachInlinePolicy(apiRestPolicy);

// add outputs to the configuration file
backend.addOutput({
    custom: {
        API: {
            [myRestApi.restApiName]: {
                endpoint: myRestApi.url,
                region: Stack.of(myRestApi).region,
                apiName: myRestApi.restApiName,
            },
        },
    },
});
