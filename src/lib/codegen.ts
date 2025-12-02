export async function generateCode(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://76jkmxjuveo32yjqqggy5idtqe0byynx.lambda-url.us-east-1.on.aws/', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resource: "/generate-code",
        path: "/generate-code",
        httpMethod: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json"
        },
        queryStringParameters: null,
        pathParameters: null,
        stageVariables: null,
        body: JSON.stringify({ "prompt": prompt }),
        isBase64Encoded: false
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // The actual HTML code is in a stringified JSON within the body property
    const body = JSON.parse(data.body);
    return body.code;

  } catch (error) {
    console.error("Error fetching generated code:", error);
    throw error;
  }
}
