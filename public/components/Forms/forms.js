import Navigate from '../../navigate.js';
import Ajax from '../../ajax.js';
import userState from '../../user.js';

export default class Forms {
  constructor(parent) {
    this.parent = parent;
    this.context = {
      isReg: false,
      isEmailCorrect: true,
      isPasswordCorrect: true,
      isPasswordRepeatCorrect: true,
      isApiError: false,
      apiErrorText: '',
    };
  }

  isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password) {
    const passwordRegex = /^[a-zA-Z0-9?!_\-*$]{6,}$/;
    return passwordRegex.test(password);
  }

  render() {
    console.log('new form, isEmailCorrect: ', this.context);
    const template = Handlebars.templates['forms.hbs'];
    this.parent.innerHTML = template({ context: this.context });
    const AuthForm = document.querySelector('.auth-form-inputs');

    AuthForm.addEventListener('submit', this.handleSubmit.bind(this));

    const AuthHref = document.querySelector('#authhref');
    AuthHref.addEventListener('click', (event) => {
      event.preventDefault();
      Navigate('auth');
    });

    const RegHref = document.querySelector('#reghref');
    RegHref.addEventListener('click', (event) => {
      event.preventDefault();
      Navigate('reg');
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const EmailInput = document.querySelector('#email-input');
    const PasswordInput = document.querySelector('#password-input');
    const EmailInputVal = EmailInput.value.trim();
    const PasswordInputVal = PasswordInput.value.trim();

    const emailValid = this.isValidEmail(EmailInputVal);
    const passwordValid = this.isValidPassword(PasswordInputVal);

    this.context.isEmailCorrect = emailValid ? true : false;
    this.context.isPasswordCorrect = passwordValid ? true : false;

    console.log(EmailInputVal, PasswordInputVal);

    if (this.context.isReg) {
      const PasswordRepeat = document.querySelector('#password-input-repeat');
      const PasswordRepeatVal = PasswordRepeat.value.trim();
      this.context.isPasswordRepeatCorrect = PasswordRepeatVal === PasswordInputVal;
    }

    if (
      this.context.isEmailCorrect &&
      this.context.isPasswordCorrect &&
      this.context.isPasswordRepeatCorrect
    ) {
      if (this.context.isReg) {
        this.Register({ password: PasswordInputVal, email: EmailInputVal });
      } else {
        this.Login({ password: PasswordInputVal, email: EmailInputVal });
      }
    } else {
      this.render();
    }
  }

  async Register({ password, email }) {
    const response = await Ajax({
      url: 'http://dead-vc.ru',
      method: 'POST',
      body: {
        password,
        email,
      },
    });

    switch (response.status) {
      case 200:
        this.context.isApiError = false;
        userState.login();
        Navigate('feed');
        break;
      case 409:
        console.error('User with this email already exists', response.status, response.error);
        this.context.isApiError = true;
        this.context.apiErrorText = 'Пользователь с этим именем существует';
        this.render();
        break;
      default:
        console.error('Error', response.status, response.error);
        this.context.isApiError = true;
        this.context.apiErrorText = 'Ошибка на стороне сервера';
        this.render();
    }
  }

  async Login({ password, email }) {
    const response = await Ajax({
      url: 'http://dead-vc.ru',
      method: 'POST',
      body: {
        password,
        email,
      },
    });

    switch (response.status) {
      case 200:
        this.context.isApiError = false;
        userState.login();
        Navigate('feed');
        break;
      case 404:
        console.error('User not found', response.status, response.error);
        this.context.isApiError = true;
        this.context.apiErrorText = 'Неверный логин или пароль';
        this.render();
        break;
      default:
        this.context.isApiError = true;
        this.context.apiErrorText = 'Ошибка на стороне сервера';
        console.error('Error', response.status, response.error);
        this.render();
    }
  }
}
