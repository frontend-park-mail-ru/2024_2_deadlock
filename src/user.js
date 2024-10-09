'use strict';
// Object.defineProperty(exports, "__esModule", { value: true });
var UserState = /** @class */ (function () {
  function UserState() {
    this.isAuthorized = false;
    this.email = '';
    this.name = '';
    this.password = '';
    this.avatar = '';
    this.registrationDate = '';
    this.subcribers = 0;
    this.subscriptions = 0;
    this.header = '';
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
  UserState.prototype.setAvatar = function (path) {
    this.avatar = path;
  };
  UserState.prototype.setHeader = function (path) {
    this.header = path;
  };
  UserState.prototype.removeAvatar = function () {
    this.avatar = '';
  };
  UserState.prototype.setRegistrationDate = function (date) {
    this.registrationDate = date;
  };
  UserState.prototype.removeDate = function () {
    this.registrationDate = '';
  };
  UserState.prototype.setSubscribers = function (subcribers) {
    this.subcribers = subcribers;
  };
  UserState.prototype.setSubscriptions = function (subscriptions) {
    this.subscriptions = subscriptions;
  };
  return UserState;
})();
var userState = new UserState();
userState.setName('MyUser');
userState.setEmail('username@email.com');
userState.setPassword('MyPassword');
userState.setRegistrationDate('10.10.2024');
userState.setAvatar('../../images/leonardo.osnova.png');
userState.setHeader('../../images/5b6eca63605bea0eeb48db43f77fa0ce.jpg');
userState.setSubscribers(13);
userState.setSubscriptions(20);
export default userState;
