import Ajax from '../ajax/ajax.js';
import UserState from '../user/user';
import { ApiPaths } from './api_config.js';

class SettingsApi {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
  async getSettings() {
    const response = await Ajax({
      url: `${this.url}${ApiPaths.settings}`,
      method: 'GET',
    });

    let isApiError = false;
    let apiErrorText = '';

    switch (response.status) {
      case 200:
        return response.body.data;
      default:
        isApiError = true;
        apiErrorText = 'Ошибка на стороне сервера';
    }
    return {
      isApiError,
      apiErrorText,
      responseStatus: response.status,
      responseError: response.error,
    };
  }
}

export default new SettingsApi(`${ApiPaths.baseUrl}`);
