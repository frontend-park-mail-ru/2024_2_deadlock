import Ajax from '../ajax/ajax';
import { ApiPaths } from './api_config.js';
import ErrorProcessor from './process_errors';

class ArticleApi {
  constructor() {}

  async createArticle(): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.baseUrl}${ApiPaths.article}`,
      method: 'POST',
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }

  async editArticle(
    articleID: string,
    title: string,
  ): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.baseUrl}${ApiPaths.article}${articleID}`,
      method: 'POST',
      body: {
        title,
      },
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }

  async getArticle(articleID: string): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.baseUrl}${ApiPaths.article}${articleID}`,
      method: 'GET',
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }

  async deleteArticle(articleID: string): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.baseUrl}${ApiPaths.article}${articleID}`,
      method: 'DELETE',
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }
}

export default new ArticleApi();
