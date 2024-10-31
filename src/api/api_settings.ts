import Ajax from '../ajax/ajax.js';
import UserState from '../user/user';
import { ApiPaths } from './api_config.js';
import UserApi from './api_user.js';

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

  async updateUsernameAndDescription(username: string, description: string){
    let isApiError = false;
    let apiErrorText = '';
    
    const meResponse = await UserApi.getCurrentUser();
    const userResponse = await UserApi.getUser(meResponse["id"]);
    const completeUser = {
      "id": meResponse["id"],
      "email": meResponse["email"],
      "num-subscribers": userResponse["num-subscribers"],
      "num-subscriptions": userResponse["num-subscriptions"],
      "avatar-url": userResponse["avatar-url"],
      "first-name": username,
      "last-name": userResponse["last-name"],
      "description": description,
      "extra-info": userResponse["extra-info"]
    }

    const response = await Ajax({
      url: `http://localhost:8000/api/v1/users/${completeUser["id"]}`,
      method: 'PUT',
      body: {
        "email": completeUser["email"],
        "extra-info": completeUser["extra-info"],
        "num-subscribers": completeUser["num-subscribers"],
        "num-subscriptions": completeUser["num-subscriptions"],
        "avatar-url": completeUser["avatar-url"],
        "first-name": completeUser["first-name"],
        "last-name": completeUser["last-name"]
      }
    });

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
