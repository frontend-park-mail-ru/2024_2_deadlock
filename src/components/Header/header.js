import UserApi from '../../api/api_user.js';
import Navigator from '../../router/navigator.js';
import UserState from '../../user/user.ts';

import template from './header.hbs';

export default class Header {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    this.parent.innerHTML = template({ user: UserState });

    if (UserState.isAuthorized) {
      const logoutButton = document.querySelector('#logout-button');
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.Logout();
      });
    } else {
      const enterButton = document.querySelector('#enter-button');
      enterButton.addEventListener('click', (event) => {
        event.preventDefault();
        Navigator.navigateTo('/auth');
      });
    }

    const profileButton = document.querySelector('#profile-button');
    profileButton.addEventListener('click', (event) => {
      event.preventDefault();
      Navigator.navigateTo('/profile');
    });
  }

  async Logout() {
    const { isApiError, apiErrorText, responseStatus, responseError } = await UserApi.Logout();
    if (isApiError) {
      console.error(apiErrorText, responseStatus, responseError);
    } else {
      Navigator.navigateTo('/feed');
    }
  }
}
