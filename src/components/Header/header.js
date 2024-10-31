import UserState from '../../user/user.ts';
import UserApi from '../../api/api_user.ts';
import Navigator from '../../router/navigator.js';
import HeaderTemplate from '../Header/header.hbs';
import styles from './header.css';

export default class Header {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    if (this.parent) {
      this.parent.innerHTML = HeaderTemplate({ user: UserState });
      if (UserState.isAuthorized) {
        const logoutButton = document.querySelector('#logout-button');
        logoutButton.addEventListener('click', (event) => {
          event.preventDefault();
          this.Logout();
        });

        const profileButton = document.querySelector('#profile-button');
        profileButton.addEventListener('click', async (event) => {
          event.preventDefault();
          const currentId = await UserApi.getCurrentUser()['id'];
          Navigator.navigateTo(`/users/${currentId}`);
        });
      } else {
        const enterButton = document.querySelector('#enter-button');
        enterButton.addEventListener('click', (event) => {
          event.preventDefault();
          Navigator.navigateTo('/auth');
        });
      }
    }
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
