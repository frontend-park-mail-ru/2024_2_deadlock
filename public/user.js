class UserState {
  constructor() {
    this.isAuthorized = false;
  }

  login() {
    this.isAuthorized = true;
  }

  logout() {
    this.isAuthorized = false;
  }
}

const userState = new UserState();
export default userState;
