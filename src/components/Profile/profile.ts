import Handlebars from 'handlebars';
import userState from '../../user/user.ts';

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
    const template = Handlebars.templates['profile.hbs'];
    this.parent.innerHTML = template({ user: userState, context: this.context });
    // var disabledHref = document.querySelector('.disabled-href');
  }
}
export default Profile;
