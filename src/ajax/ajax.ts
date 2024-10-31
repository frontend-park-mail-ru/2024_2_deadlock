const HTTP_METHOD_POST = 'POST';
const HTTP_METHOD_PUT = 'PUT';
const HTTP_METHOD_GET = 'GET';

export default async function Ajax({
  method,
  url,
  body = undefined,
  contentType = 'application/json',
}: {
  method: string;
  url: string;
  body?: any;
  contentType?: string;
}): Promise<{ status: number; body?: object; error?: object }> {
  const requestBody: RequestInit = {
    credentials: 'include',
    method,
    headers: {},
    body,
  };

  if (method === HTTP_METHOD_POST || method === HTTP_METHOD_PUT) {
    if (contentType === 'application/json') {
      requestBody.body = JSON.stringify(body);
    } else {
      requestBody.body = body;
    }
  }

  let response;
  try {
    response = await fetch(url, requestBody);
  } catch {
    return {
      status: 503,
      error: { message: 'service is not available now' },
    };
  }

  let respBody;
  try {
    respBody = await response.json();
  } catch {
    return {
      status: response.status,
      error: { message: 'failed to parse respBody' },
    };
  }

  if (response.status >= 400) {
    return {
      status: response.status,
      error: respBody,
    };
  }
  return {
    status: response.status,
    body: respBody,
  };
}
