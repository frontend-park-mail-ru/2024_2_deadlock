'use strict';
var UserState = /** @class */ (function () {
  function UserState() {
    this.isAuthorized = false;
    this.email = '';
    this.name = '';
    this.password = '';
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
  UserState.prototype.setPassword = function (password) {
    this.password = password;
  };
  UserState.prototype.removePassword = function () {
    this.password = '';
  };
  return UserState;
})();
var userState = new UserState();
export default userState;
