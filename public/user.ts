interface UserState {
  isAuthorized: boolean;
  email: string;
  name: string;
  password: string;
  avatar: string;
  registrationDate: string;
  subcribers: number;
  subscriptions: number;
  header: string;
}

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

  setAvatar(path: string) {
    this.avatar = path;
  }

  setHeader(path: string) {
    this.header = path;
  }

  removeAvatar() {
    this.avatar = '';
  }

  setRegistrationDate(date: string) {
    this.registrationDate = date;
  }

  removeDate() {
    this.registrationDate = '';
  }

  setSubscribers(subcribers: number) {
    this.subcribers = subcribers;
  }

  setSubscriptions(subscriptions: number) {
    this.subscriptions = subscriptions;
  }
}

const userState = new UserState();
userState.setName('MyUser');
userState.setEmail('username@email.com');
userState.setPassword('MyPassword');
userState.setRegistrationDate('10.10.2024');
userState.setAvatar('../../images/leonardo.osnova.png');
userState.setHeader('../../images/5b6eca63605bea0eeb48db43f77fa0ce.jpg');
userState.setSubscribers(13);
userState.setSubscriptions(20);
export default userState;
