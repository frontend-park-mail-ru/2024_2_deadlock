const HTTP_METHOD_POST = 'POST';
const HTTP_METHOD_PUT = 'PUT';
const HTTP_METHOD_GET = 'GET';

export default async function Ajax({ method, url, body = null }) {
  const requestBody = {
    credentials: 'include',
    method,
    header: {
      'Content-Type': 'application/json',
    },
  };

  if (method === HTTP_METHOD_POST || method === HTTP_METHOD_PUT) {
    requestBody.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, requestBody);
  } catch {
    return {
      status: 503,
      error: 'service is not available now',
    };
  }

  let respBody;
  try {
    respBody = await response.json();
  } catch {
    return {
      status: response.status,
      error: 'failed to parse respBody',
      body: 'failed to parse respBody',
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
