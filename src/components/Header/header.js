import Navigate from '../../navigate.js';
import userState from '../../user.js';
import Ajax from '../../ajax.js';

export default class Header {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    const template = Handlebars.templates['header.hbs'];
    this.parent.innerHTML = template({ user: userState });

    if (userState.isAuthorized) {
      const logoutButton = document.querySelector('#logout-button');
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.Logout();
      });
    } else {
      const enterButton = document.querySelector('#enter-button');
      enterButton.addEventListener('click', (event) => {
        event.preventDefault();
        Navigate('auth');
      });
    }
  }

  async Logout() {
    const response = await Ajax({
      url: 'http://dead-vc.ru/api/v1/logout',
      method: 'POST',
    });

    switch (response.status) {
      case 200:
        console.log('Logout successful', response.status, response.body);
        userState.logout();
        userState.removeEmail();
        Navigate('feed');
        break;
      default:
        console.error('Error', response.status, response.error);
    }
  }
}
