
export async function generateCode(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://76jkmxjuveo32yjqqggy5idtqe0byynx.lambda-url.us-east-1.on.aws/', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "prompt": prompt
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Error response body:", errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // The API returns a body property which is a stringified JSON.
    // That stringified JSON contains the 'code' property.
    if (data.body) {
      const body = JSON.parse(data.body);
      return body.code;
    }

    // Fallback for cases where the body is not nested.
    if(data.code) {
      return data.code;
    }

    return "";

  } catch (error) {
    console.error("Error fetching generated code:", error);
    throw error;
  }
}
