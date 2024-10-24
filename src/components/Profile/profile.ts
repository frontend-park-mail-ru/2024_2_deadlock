import Handlebars from 'handlebars';
import userState from '../../user/user';
import templates from './profile.hbs';
import styles from './profile.css';

class Profile {
  parent: Element;
  context: {
    isPosts: boolean;
  };
  constructor(parent: Element) {
    this.parent = parent;
    this.context = {
      isPosts: true,
    };
  }

  render() {
    this.parent.innerHTML = templates({ user: userState, context: this.context });
    // var disabledHref = document.querySelector('.disabled-href');
  }
}
export default Profile;
