'use strict';
// interface UserState {
// }
// Object.defineProperty(exports, "__esModule", { value: true });
class UserState {
  constructor() {
    this.isAuthorized = false;
    this.email = '';
    this.name = '';
    this.password = '';
  }
  login() {
    this.isAuthorized = true;
  }
  logout() {
    this.isAuthorized = false;
  }
  setEmail(email) {
    this.email = email;
  }
  removeEmail() {
    this.email = '';
  }
  setName(name) {
    this.name = name;
  }
  removeName() {
    this.name = '';
  }
  setPassword(password) {
    this.password = password;
  }
  removePassword() {
    this.password = '';
  }
}
const userState = new UserState();
export default userState;
