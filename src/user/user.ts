import Handlebars from 'handlebars';
import templates from '../components/Profile/profile.hbs';
import styles from '../components/Profile/profile.css';
import UserApi from "../api/api_user";

class UserState {
  parent: Element;
  state: {
    id: number,
    isAuthorized: boolean,
  }

  constructor(
    id: number,
    parent: Element
  ) {
    this.state = {
      id: id,
      isAuthorized: false,
    },
    this.parent = parent;
  }

  login() {
    this.state.isAuthorized = true;
    // this.userState.email = email;
    localStorage.setItem('isAuthorized', JSON.stringify(this.state.isAuthorized));
    // localStorage.setItem('email', this.userState.email);
  }

  logout() {
    this.state.isAuthorized = false;
    localStorage.removeItem('isAuthorized');
    // localStorage.removeItem('email');
  }

  // update() {
  //   this.userState.isAuthorized = JSON.parse(localStorage.getItem('isAuthorized'));
  //   if (this.userState.isAuthorized) {
  //     this.userState.email = localStorage.getItem('email');
  //   }
  // }

}

export default UserState;
