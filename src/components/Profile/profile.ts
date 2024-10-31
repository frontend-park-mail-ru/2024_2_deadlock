import Handlebars from 'handlebars';
import templates from './profile.hbs';
import styles from './profile.css';
import UserApi from '../../api/api_user';

class Profile {
  parent: Element;
  context: {
    isPosts: boolean;
  };
  firstname: string;
  avatar: string;
  header: string;
  registrationDate: string;
  subcribers: number;
  subscriptions: number;

  constructor(parent: Element, user: {
    "registration-date": string,
    "extra-info": string,
    "num-subscribers": number,
    "num-subscriptions": number,
    "avatar-url": string,
    "first-name": string,
    "last-name": string
  }) {
    this.parent = parent;
    this.context = {
      isPosts: true,
    };
    this.registrationDate = user["registration-date"];
    this.subcribers = user["num-subscribers"];
    this.subscriptions = user["num-subscriptions"];
    this.avatar = user["avatar-url"];
    this.firstname = user["first-name"];
    this.header = '';
  }

  async render(id: number) {
    const response = await UserApi.getUser(id);
    const respStr = JSON.stringify(response);
    this.parent.innerHTML = templates({
      context: this.context,
      profile: this
    });
  }
}

export default Profile;
