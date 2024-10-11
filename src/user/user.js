class UserState {
  constructor() {
    this.isAuthorized = false;
    this.email = '';
    this.update();
  }

  login(email) {
    this.isAuthorized = true;
    this.email = email;
    localStorage.setItem('isAuthorized', JSON.stringify(this.isAuthorized));
    localStorage.setItem('email', this.email);
  }

  logout() {
    this.isAuthorized = false;
    localStorage.removeItem('isAuthorized');
    localStorage.removeItem('email');
  }

  update() {
    this.isAuthorized = JSON.parse(localStorage.getItem('isAuthorized'));
    if (this.isAuthorized) {
      this.email = localStorage.getItem('email');
    }
  }
}

export default new UserState();
