'use strict';
// interface UserState {
// }
// Object.defineProperty(exports, "__esModule", { value: true });
var UserState = /** @class */ (function () {
  function UserState() {
    this.isAuthorized = false;
    this.email = '';
    this.name = '';
  }
  UserState.prototype.login = function () {
    this.isAuthorized = true;
  };
  UserState.prototype.logout = function () {
    this.isAuthorized = false;
  };
  UserState.prototype.setEmail = function (email) {
    this.email = email;
  };
  UserState.prototype.removeEmail = function () {
    this.email = '';
  };
  UserState.prototype.setName = function (name) {
    this.name = name;
  };
  UserState.prototype.removeName = function () {
    this.name = '';
  };
  return UserState;
})();
var userState = new UserState();
export default userState;
