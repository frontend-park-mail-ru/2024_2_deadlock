import Navigate from '../../navigate.js';

export default class Forms {
  constructor(parent, context) {
    this.parent = parent;
    this.context = context;
  }

  isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password) {
    const passwordRegex = /^[a-zA-Z0-9?!_\-*$]{6}$/;
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

    if (this.context.isReg) {
      const PasswordRepeat = document.querySelector('#password-input-repeat');
      const PasswordRepeatVal = PasswordRepeat.value.trim();
      this.context.isPasswordRepeatCorrect = PasswordRepeatVal === PasswordInputVal;
    }
    this.render();
  }
}
