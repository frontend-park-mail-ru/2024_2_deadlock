import Ajax from '../ajax/ajax';
import { ApiPaths } from './api_config.js';
import ErrorProcessor from './process_errors';

class FieldApi {
  constructor() {}

  async SendFieldImage(
    image: FormData,
    fieldID: string,
  ): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.baseUrl}${ApiPaths.fields}${fieldID}${ApiPaths.image}`,
      method: 'POST',
      body: image,
      contentType: 'multipart/form-data',
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }

  async CreateField(
    prevID: string,
    nextID: string,
  ): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.article.field}`,
      method: 'POST',
      body: {
        prevID,
        nextID,
      },
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }

  async EditField(
    fieldID: string,
    type: string,
    content: string,
  ): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    console.log('2 seconds passed...', type, content);
    const response = await Ajax({
      url: `${ApiPaths.article.field}${fieldID}`,
      method: 'PUT',
      body: {
        type,
        content,
      },
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }

  async SwapField(
    fieldID: string,
    direction: string,
  ): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.article.field}${fieldID}${ApiPaths.swap}`,
      method: 'PUT',
      body: {
        id: fieldID,
        direction,
      },
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }

  async DeleteField(fieldID: string): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.article.field}${fieldID}`,
      method: 'DELETE',
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }
}

export default new FieldApi();
