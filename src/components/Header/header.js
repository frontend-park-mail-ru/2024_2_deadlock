// import Ajax from '../../ajax/ajax.js';
import UserState from '../../user/user.ts';
import UserApi from '../../api/api_user.js';
import Navigator from '../../router/navigator.js';
// import Handlebars from 'handlebars';
import HeaderTemplate from '../Header/header.hbs';
import styles from './header.css';

export default class Header {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    // const template = Handlebars.templates['header.hbs'];
    if (this.parent) {
      this.parent.innerHTML = HeaderTemplate({ user: UserState });
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
