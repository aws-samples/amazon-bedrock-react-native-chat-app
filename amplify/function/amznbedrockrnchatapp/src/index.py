import boto3
import json

bedrock = boto3.client("bedrock-runtime", "us-east-1")
modelId = "ai21.j2-ultra-v1"
accept = "application/json"
contentType = "application/json"


def handler(event, context):
    try:
        if "body" not in event:
            raise ValueError("Request body is missing.")
        body = json.loads(event.get("body"))

        prompt_message = body.get("message", "hi")

        new_body = {
            "prompt": prompt_message,
            "maxTokens": 200,
            "temperature": 0.7,
            "topP": 1,
            "stopSequences": [],
            "countPenalty": {"scale": 0},
            "presencePenalty": {"scale": 0},
            "frequencyPenalty": {"scale": 0},
        }

        response = bedrock.invoke_model(
            body=json.dumps(new_body),
            modelId=modelId,
            accept=accept,
            contentType=contentType,
        )

        response_body = json.loads(response.get("body").read())
        completion_message = response_body.get("completion")
        print("Completion:", completion_message)
        return {"statusCode": 200, "body": json.dumps(response_body)}

    except Exception as e:
        error_message = str(e)
        print("Error:", error_message)
        return {"statusCode": 500, "body": json.dumps({"error": error_message})}
