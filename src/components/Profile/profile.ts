import Handlebars from 'handlebars';
import userState from '../../user/user.js';

interface Profile {
  parent: Element;
  context: {
    isPosts: boolean;
  };
}

class Profile {
  constructor(parent: Element) {
    this.parent = parent;
    this.context = {
      isPosts: true,
    };
  }

  render() {
    const template = Handlebars.templates['profile.hbs'];
    this.parent.innerHTML = template({ user: userState, context: this.context });
    var disabledHref = document.querySelector('.disabled-href');
  }
}
export default Profile;
