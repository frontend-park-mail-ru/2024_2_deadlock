class UserState {
  constructor() {
    this.isAuthorized = false;
    this.email = '';
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
}

const userState = new UserState();
export default userState;
