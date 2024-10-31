import Ajax from '../ajax/ajax';
import { ApiPaths } from './api_config.js';
import ErrorsProcessor from './process_errors';

class FeedApi {
  constructor() {}

  async getArticlesList(): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.feed}`,
      method: 'GET',
    });

    const cleanData = ErrorsProcessor.processErrors(response);
    return cleanData;
  }
}

export default new FeedApi();
