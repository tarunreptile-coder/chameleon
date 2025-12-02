
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
    
    let codeData;
    // Handle cases where the response is doubly stringified in a 'body' property
    if (typeof data.body === 'string') {
      try {
        codeData = JSON.parse(data.body);
      } catch (e) {
        console.error("Failed to parse nested JSON from body", e);
        throw new Error("Invalid response format from code generation API.");
      }
    } else {
      codeData = data;
    }

    const { html, css, js } = codeData;

    if (!html) {
      console.error("API response missing 'html' content", codeData);
      return "<p>Error: Generated code did not contain any HTML.</p>";
    }

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-M">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Global scrollbar styling for a cleaner look */
            ::-webkit-scrollbar {
              width: 5px;
            }
            ::-webkit-scrollbar-track {
              background: #f1f1f1; 
            }
            ::-webkit-scrollbar-thumb {
              background: #888; 
              border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #555; 
            }
            ${css || ''}
          </style>
      </head>
      <body>
          ${html}
          <script>
            ${js || ''}
          </\'script>
      </body>
      </html>
    `;

    return fullHtml;

  } catch (error) {
    console.error("Error fetching generated code:", error);
    // Return an HTML error message to be displayed in the iframe
    return `<div style="padding: 20px; font-family: sans-serif; color: red;">
              <h2>Generation Failed</h2>
              <p>Could not generate UI. Please try again.</p>
              <p>Details: ${error instanceof Error ? error.message : String(error)}</p>
            </div>`;
  }
}
