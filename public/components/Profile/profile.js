'use strict';
import Navigate from '../../navigate.js';
import userState from '../../user.js';
var Profile = /** @class */ (function () {
  function Profile(parent) {
    this.parent = parent;
    this.context = {
      isPosts: true,
    };
  }
  Profile.prototype.render = function () {
    console.log('new form, isEmailCorrect: ', this.context);
    var template = Handlebars.templates['profile.hbs'];
    this.parent.innerHTML = template({ user: userState.default, context: this.context });
  };
  return Profile;
})();
export default Profile;
