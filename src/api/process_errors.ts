class ErrorProcessor {
  constructor() {}

  processErrors(ajaxResponse: { status: number; body?: object; error?: object }): {
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  } {
    let response = ajaxResponse;
    let isApiError = false;
    let responseStatus = response.status;
    let body: object | undefined = undefined;
    let error: object | undefined = undefined;

    if (response.status >= 400) {
      isApiError = true;
      error = response.error;
    } else {
      body = response.body;
    }
    return {
      isApiError,
      responseStatus,
      body,
      error,
    };
  }
}

export default new ErrorProcessor();
