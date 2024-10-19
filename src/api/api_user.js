import UserState from '../user/user.ts';
import Ajax from '../ajax/ajax.js';
import { ApiPaths } from './api_config.js';

class UserApi {
  constructor(url) {
    this.url = url;
  }

  async Register({ password, email }) {
    const response = await Ajax({
      url: `${this.url}${ApiPaths.user.register}`,
      method: 'POST',
      body: {
        password,
        email,
      },
    });

    let isApiError = false;
    let apiErrorText = '';

    switch (response.status) {
      case 200:
        UserState.login(email);
        break;
      case 409:
        isApiError = true;
        apiErrorText = 'Пользователь с этим именем существует';
        break;
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

  async Login({ password, email }) {
    const response = await Ajax({
      url: `${this.url}${ApiPaths.user.login}`,
      method: 'POST',
      body: {
        password,
        email,
      },
    });

    let isApiError = false;
    let apiErrorText = '';

    switch (response.status) {
      case 200:
        UserState.login(email);
        break;
      case 404:
        isApiError = true;
        apiErrorText = 'Неверный логин или пароль';
        break;
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

  async Logout() {
    const response = await Ajax({
      url: `${this.url}${ApiPaths.user.logout}`,
      method: 'POST',
    });

    let isApiError = false;
    let apiErrorText = '';

    switch (response.status) {
      case 200:
        UserState.logout();
        break;
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

export default new UserApi(`${ApiPaths.baseUrl}`);
