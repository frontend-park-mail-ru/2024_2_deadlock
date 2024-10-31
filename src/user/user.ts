import Handlebars from 'handlebars';
import templates from '../components/Profile/profile.hbs';
import styles from '../components/Profile/profile.css';
import UserApi from "../api/api_user";

class UserState {
  parent: Element;
  id: number;
  isAuthorized: boolean;
  avatar_url: string;
  username: string;
  email: string;

  constructor(
    id: number,
    parent: Element
  ) {
    this.id = id;
    this.isAuthorized = false;
    this.parent = parent;
  }

  login(email: string) {
    this.isAuthorized = true;
    this.email = email;
    localStorage.setItem('isAuthorized', JSON.stringify(this.isAuthorized));
    localStorage.setItem('email', this.email);
  }

  logout() {
    this.isAuthorized = false;
    localStorage.removeItem('isAuthorized');
    localStorage.removeItem('email');
  }

  update() {
    this.isAuthorized = JSON.parse(localStorage.getItem('isAuthorized'));
    if (this.isAuthorized) {
      this.email = localStorage.getItem('email');
    }
  }

}

export default UserState;
