// interface UserState {
// }

class UserState {
  isAuthorized: boolean;
  email: string;
  name: string;
  password: string;
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

  setEmail(email: string) {
    this.email = email;
  }

  removeEmail() {
    this.email = '';
  }

  setName(name: string) {
    this.name = name;
  }

  removeName() {
    this.name = '';
  }

  setPassword(password: string) {
    this.password = password;
  }

  removePassword() {
    this.password = '';
  }
}

const userState = new UserState();
export default userState;
