import UserState from '../user/user.js';
import Ajax from '../ajax/ajax.js';
import { ApiPaths } from './api_config.js';
import ErrorProcessor from './process_errors';

class UserApi {
  constructor() {}

  async GetCurrentUserData(): Promise<{
    isApiError: boolean;
    responseStatus: number;
    body?: object;
    error?: object;
  }> {
    const response = await Ajax({
      url: `${ApiPaths.baseUrl}${ApiPaths.user.me}`,
      method: 'GET',
    });

    const cleanData = ErrorProcessor.processErrors(response);
    return cleanData;
  }
}

export default new UserApi();
