import Handlebars from 'handlebars';
import templates from '../components/Profile/profile.hbs';
import styles from '../components/Profile/profile.css';
import UserApi from "../api/api_user";

class UserState {
  parent: Element;
  userState: {
    id: number,
    isAuthorized: boolean,
    email: string,
    password: string,
  }
  context: {
    isPosts: boolean;
  };

  constructor(
    id: number,
    e: string,
    p: string,
    parent: Element
  ) {
    this.userState = {
      id: id,
      isAuthorized: false,
      email: e,
      password: p,
    },
    this.context = {
      isPosts: true,
    },
    this.parent = parent;
  }

  login(email: string) {
    this.userState.isAuthorized = true;
    this.userState.email = email;
    localStorage.setItem('isAuthorized', JSON.stringify(this.userState.isAuthorized));
    localStorage.setItem('email', this.userState.email);
  }

  logout() {
    this.userState.isAuthorized = false;
    localStorage.removeItem('isAuthorized');
    localStorage.removeItem('email');
  }

  update() {
    this.userState.isAuthorized = JSON.parse(localStorage.getItem('isAuthorized'));
    if (this.userState.isAuthorized) {
      this.userState.email = localStorage.getItem('email');
    }
  }

  async render() {
    const response = await UserApi.getUser(this.userState.id);
    // alert(response);
    const respStr = JSON.stringify(response);
    this.parent.innerHTML = templates({
      context: this.context,
      user: this.userState
    });
  }

  // setHeader(url: string) {
  //   this.userState.header = url;
  // }
}

export default UserState;
