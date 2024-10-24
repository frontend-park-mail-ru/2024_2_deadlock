import Handlebars from 'handlebars';
import userState from '../../user/user';
import templates from './profile.hbs';
import styles from './profile.css';
import ProfileApi from '../../api/api_profile';

class Profile {
  parent: Element;
  header: {};
  context: {
    isPosts: boolean;
  };
  constructor(parent: Element) {
    this.parent = parent;
    this.context = {
      isPosts: true,
    };
    this.header = '';
  }

  async render() {
    this.header = await ProfileApi.getProfile();
    this.parent.innerHTML = templates({ 
      user: userState, 
      context: this.context, 
      header: this.header 
    });
    // var disabledHref = document.querySelector('.disabled-href');
  }

  setHeader(url: string) {
    this.header = url;
  }
}

export default Profile;
