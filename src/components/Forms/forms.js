import Navigator from '../../router/navigator.js';
import Ajax from '../../ajax/ajax.js';
import UserApi from '../../api/api_user.js';
import FormsTemplate from '../Forms/forms.hbs';

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
      emailValue: '',
      passwordValue: '',
      passwordRepeatValue: '',
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
    const placeForHeader = document.querySelector('.place-for-header');
    placeForHeader.innerHTML = '';
    // const template = Handlebars.templates['forms.hbs'];
    this.parent.innerHTML = FormsTemplate({ context: this.context });
    const AuthForm = document.querySelector('.auth-form-inputs');

    AuthForm.addEventListener('submit', this.handleSubmit.bind(this));

    const AuthHref = document.querySelector('#authhref');
    AuthHref.addEventListener('click', (event) => {
      event.preventDefault();
      Navigator.navigateTo('/auth');
    });

    const RegHref = document.querySelector('#reghref');
    RegHref.addEventListener('click', (event) => {
      event.preventDefault();
      Navigator.navigateTo('/reg');
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const EmailInputVal = document.querySelector('#email-input').value.trim();
    const PasswordInputVal = document.querySelector('#password-input').value.trim();

    this.context.emailValue = EmailInputVal;
    this.context.passwordValue = PasswordInputVal;

    const emailValid = this.isValidEmail(EmailInputVal);
    const passwordValid = this.isValidPassword(PasswordInputVal);

    this.context.isEmailCorrect = emailValid;
    this.context.isPasswordCorrect = passwordValid;

    const PasswordRepeatVal = '';
    if (this.context.isReg) {
      const PasswordRepeatVal = document.querySelector('#password-input-repeat').value.trim();
      this.context.passwordRepeatValue = PasswordRepeatVal;
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
    const { isApiError, apiErrorText, responseStatus, responseError } = await UserApi.Register({
      password,
      email,
    });
    this.context.isApiError = isApiError;
    this.context.apiErrorText = apiErrorText;
    if (isApiError) {
      console.error(apiErrorText, responseStatus, responseError);
      this.render();
    } else {
      Navigator.navigateTo('/feed');
    }
  }

  async Login({ password, email }) {
    const { isApiError, apiErrorText, responseStatus, responseError } = await UserApi.Login({
      password,
      email,
    });
    this.context.isApiError = isApiError;
    this.context.apiErrorText = apiErrorText;
    if (isApiError) {
      console.error(apiErrorText, responseStatus, responseError);
      this.render();
    } else {
      Navigator.navigateTo('/feed');
    }
  }
}
