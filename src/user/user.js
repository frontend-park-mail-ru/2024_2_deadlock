// import userState from "./user";

class UserState {
  constructor() {
    this.isAuthorized = false;
    this.email = '';
    this.name = '';
    this.password = '';
    this.avatar = '';
    this.registrationDate = '';
    this.subcribers = 0;
    this.subscriptions = 0;
    this.header = '';
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

  setEmail(email) {
    this.email = email;
  }

  setName(name) {
    this.name = name;
  }

  setPassword(password) {
    this.password = password;
  }

  setAvatar(path) {
    this.avatar = path;
  }

  setHeader(path) {
    this.header = path;
  }

  setRegistrationDate(date) {
    this.registrationDate = date;
  }

  setSubscribers(subcribers) {
    this.subcribers = subcribers;
  }

  setSubscriptions(subscriptions) {
    this.subscriptions = subscriptions;
  }
}

let userState = new UserState();
userState.setEmail('email@email.com');
userState.setPassword('MyPassword');
userState.setRegistrationDate('10.10.2024');
userState.setAvatar('../../images/leonardo.osnova.png');
userState.setHeader('../../images/5b6eca63605bea0eeb48db43f77fa0ce.jpg');
userState.setSubscribers(13);
userState.setSubscriptions(20);
export default userState;
