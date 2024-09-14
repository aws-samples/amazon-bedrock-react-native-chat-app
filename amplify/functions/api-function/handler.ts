import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { APIGatewayProxyHandler } from "aws-lambda";

const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });
const modelId = "ai21.j2-ultra-v1";
const accept = "application/json";
const contentType = "application/json";

interface RequestBody {
  message?: string;
}

interface ResponseBody {
  completion: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      throw new Error("Request body is missing.");
    }

    const body: RequestBody = JSON.parse(event.body);
    const promptMessage = body.message || "hi";

    const newBody = {
      prompt: promptMessage,
      maxTokens: 200,
      temperature: 0.7,
      topP: 1,
      stopSequences: [],
      countPenalty: { scale: 0 },
      presencePenalty: { scale: 0 },
      frequencyPenalty: { scale: 0 },
    };

    const command = new InvokeModelCommand({
      body: JSON.stringify(newBody),
      modelId: modelId,
      accept: accept,
      contentType: contentType,
    });

    const response = await bedrock.send(command);
    const responseBody: ResponseBody = JSON.parse(Buffer.from(response.body as Uint8Array).toString());

    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("Error:", errorMessage);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};