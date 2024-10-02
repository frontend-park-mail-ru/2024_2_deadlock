const HTTP_METHOD_POST = 'POST';
const HTTP_METHOD_GET = 'GET';

export default async function Ajax({ method, url, body = null }) {
  const requestBody = {
    credentials: 'include',
    method,
    header: {
      'Content-Type': 'application/json',
    },
  };

  if (method === HTTP_METHOD_POST) {
    requestBody.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestBody);

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
  // console.log('respBody', respBody);

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
