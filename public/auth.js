// import Handlebars from 'handlebars';
// import { createForm } from './createFunctions';

// const template = Handlebars.compile('Name: {{name}}');
// console.log(template({ name: 'Nils' }));

const root = document.getElementsByClassName('window').item(0);

const windowHeader = document.createElement('div');
windowHeader.classList.add('window-header');
windowHeader.innerHTML = 'DEAD-VC';
root.appendChild(windowHeader);

const windowBody = document.createElement('div');
windowBody.classList.add('window-body');

const loginSetupSliderTabs = document.createElement('div');
loginSetupSliderTabs.classList.add('slider-tabs');

windowBody.appendChild(loginSetupSliderTabs);

const formDiv = document.createElement('div');
formDiv.classList.add('form');

windowBody.appendChild(formDiv);

root.appendChild(windowBody);

const PASSWORDREXEXP = '^(?=.*[0-9])(?=.*[!?_\\-*$])[a-zA-Z0-9!?_\\-*$]+$';

let form = createForm('', 'post');

let checkedForm;
let email, password, confirmPassword;

const renderLogin = () => {
  form = createForm('', 'post');

  const fields = document.createElement('div');

  const emailInputDiv = createInputDiv('Введите E-Mail', 'email', 'E-Mail');
  const emailField = emailInputDiv.lastChild.firstChild;
  emailField.required = true;
  emailField.minLength = 5;

  const passwordInputDiv = createInputDiv('Введите пароль', 'password', 'Пароль');
  const passwordField = passwordInputDiv.lastChild.firstChild;
  passwordField.required = true;
  passwordField.minLength = 6;
  passwordField.maxLength = 255;
  passwordField.pattern = PASSWORDREXEXP;

  const submitBtn = createButton('Войти', 'submit');
  submitBtn.classList.add('submit-btn');

  fields.classList.add('fields');
  fields.appendChild(emailInputDiv);
  fields.appendChild(passwordInputDiv);
  fields.appendChild(submitBtn);
  form.appendChild(fields);

  checkedForm = form;

  email = fields.children[0].lastChild.firstChild;
  password = fields.children[1].lastChild.firstChild;
  return form;
};

const renderSignup = () => {
  form = createForm('', 'post');

  const fields = document.createElement('div');

  const emailInputDiv = createInputDiv('Введите E-Mail', 'email', 'E-Mail');
  const emailField = emailInputDiv.lastChild.firstChild;
  emailField.required = true;
  emailField.minLength = 5;

  const passwordInputDiv = createInputDiv('Введите пароль', 'password', 'Пароль');
  const passwordField = passwordInputDiv.lastChild.firstChild;
  passwordField.required = true;
  passwordField.minLength = 6;
  passwordField.maxLength = 255;
  passwordField.pattern = PASSWORDREXEXP;

  const confirmPasswordInputDiv = createInputDiv(
    'Подтвердите пароль',
    'password',
    'Подтвердите пароль',
  );
  const confirmPasswordField = confirmPasswordInputDiv.lastChild.firstChild;
  confirmPasswordField.required = true;
  confirmPasswordField.minLength = 6;
  confirmPasswordField.maxLength = 255;
  confirmPasswordField.pattern = PASSWORDREXEXP;

  const submitBtn = createButton('Зарегистрироваться', 'submit');
  submitBtn.classList.add('submit-btn');

  const reminderDiv = document.createElement('div');
  reminderDiv.classList.add('reminder');
  const reminder = document.createElement('span');
  reminder.innerHTML = 'Пароль должен содержать:';

  const unorderedList = document.createElement('ul');
  const req1 = document.createElement('li');
  const req2 = document.createElement('li');
  const req3 = document.createElement('li');

  req1.innerHTML = 'заглавные и строчные латинские буквы';
  req2.innerHTML = 'минимум 6 символов';
  req3.innerHTML = 'цифру и спецсимвол';
  unorderedList.appendChild(req1);
  unorderedList.appendChild(req2);
  unorderedList.appendChild(req3);
  unorderedList.classList.add('reminder-ul');

  // reminder.appendChild(unorderedList);

  reminderDiv.appendChild(reminder);
  reminderDiv.appendChild(unorderedList);

  fields.classList.add('form-fields');
  fields.appendChild(emailInputDiv);
  fields.appendChild(passwordInputDiv);
  fields.appendChild(confirmPasswordInputDiv);
  fields.appendChild(reminderDiv);
  fields.appendChild(submitBtn);
  form.appendChild(fields);

  checkedForm = form;

  email = fields.children[0].lastChild.firstChild;
  password = fields.children[1].lastChild.firstChild;
  confirmPassword = fields.children[2].lastChild.firstChild;
  return form;
};

const createInputField = (type, text, name) => {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = text;
  input.classList.add('input-field__default');

  return input;
};

const createInputDiv = (label, type, placeholder) => {
  const inputDiv = document.createElement('div');
  const inputText = document.createElement('div');
  const inputFieldDiv = document.createElement('div');

  inputText.innerHTML = label;

  const inputField = createInputField(type, placeholder, type);
  inputFieldDiv.appendChild(inputField);

  inputFieldDiv.classList.add('input-field');
  inputText.classList.add('input-text');
  inputDiv.classList.add('input');

  // добавляем глазик
  if (inputFieldDiv.firstChild.type === 'password') {
    const passwordControl = document.createElement('a');
    passwordControl.href = '#';
    passwordControl.classList.add('password-control__hide');
    // passwordControl.dataset.section = 'password-control';
    inputFieldDiv.appendChild(passwordControl);
  }

  inputDiv.appendChild(inputText);
  inputDiv.appendChild(inputFieldDiv);

  return inputDiv;
};

const createButton = (label, type) => {
  const button = document.createElement('button');
  button.type = type;
  button.innerHTML = label;

  return button;
};

const config = {
  slideTabs: {
    loginTab: {
      href: '/login',
      text: 'Вход',
      render: renderLogin(),
    },
    signupTab: {
      href: '/signup',
      text: 'Регистрация',
      render: renderSignup(),
    },
  },
};

const state = {
  activeLink: null,
  hidePassword: true,
};

const renderMenu = () => {
  Object.entries(config.slideTabs).forEach(([key, { href, text }], index) => {
    const tab = document.createElement('a');
    tab.href = href;
    tab.text = text;
    tab.dataset.section = key;

    if (index === 0) {
      tab.classList.add('slider-tabs__active');
      state.activeLink = tab;
    }
    loginSetupSliderTabs.appendChild(tab);
  });
};

const emailErrorMsg = document.createElement('div');
const passwordErrorMsg = document.createElement('div');
const confirmPasswordErrorMsg = document.createElement('div');
let emailDiv, passwordDiv, confirmPasswordDiv;

root.addEventListener('click', (event) => {
  const { target } = event;
  if (
    !(
      target.classList.contains('password-control__hide') ||
      target.classList.contains('password-control__view')
    ) &&
    (target.tagName.toLowerCase() === 'a' || target instanceof HTMLAnchorElement)
  ) {
    event.preventDefault();
    formDiv.innerHTML = '';
    state.activeLink.classList.remove('slider-tabs__active');
    target.classList.add('slider-tabs__active');
    state.activeLink = target;

    form = config.slideTabs[target.dataset.section].render;
    formDiv.appendChild(form);
  }

  if (target.classList.contains('submit-btn')) {
    form = formDiv.children[0];
    fields = form.firstChild;
    emailDiv = fields.firstChild;
    passwordDiv = fields.children[1];
    email = emailDiv.children[1].firstChild;
    password = passwordDiv.children[1].firstChild;
    console.log('bebebe s bababa');
    console.log(password);
    console.log(password.validity.patternMismatch);
    if (email.classList.contains('input-field__error')) {
      email.classList.remove('input-field__error');
      email.classList.add('input-field__default');
    }
    if (password.classList.contains('input-field__error')) {
      password.classList.remove('input-field__error');
      password.classList.add('input-field__default');
    }
    fields = form.firstChild;
    event.preventDefault();
    if (state.activeLink.dataset.section === 'loginTab') {
      if (!(email.validity.valid && password.validity.valid)) {
        // Если поле email не валидно, отображаем соответствующее сообщение об ошибке
        showError();
        // Затем предотвращаем стандартное событие отправки формы
        event.preventDefault();
      }
    } else if (state.activeLink.dataset.section === 'signupTab') {
      confirmPasswordDiv = fields.children[2];
      confirmPassword = confirmPasswordDiv.children[1].firstChild;
      confirmPassword.classList.remove('input-field__error');
      confirmPassword.classList.add('input-field__default');
      if (
        !(email.validity.valid && password.validity.valid && confirmPassword.validity.valid) ||
        password.value !== confirmPassword.value
      ) {
        // Если поле email не валидно, отображаем соответствующее сообщение об ошибке
        showError();
        // Затем предотвращаем стандартное событие отправки формы
        event.preventDefault();
      }
    }
  }
});

renderMenu();
formDiv.appendChild(renderLogin());

// const passwordControl = document.getElementsByClassName('password-control').item(0);
// passwordControl.addEventListener('click', (event) => {
//     if (state.hidePassword === true) {
//         passwordControl.classList.add('password-control__view');
//         passwordControl.classList.remove('password-control__hide');
//         state.hidePassword = false;
//         passwordControl.parentElement.firstChild.type = 'text';
//     }
//     else{
//         passwordControl.classList.remove('password-control__view');
//         passwordControl.classList.add('password-control__hide');
//         state.hidePassword = true;
//         passwordControl.parentElement.firstChild.type = 'password';
//     }
// })

// Существуют разные способы получить DOM-узел; здесь мы определяем саму форму и
// поле ввода email и элемент span, в который поместим сообщение об ошибке

// const email = document.getElementsByName('email')[0];

function showError() {
  passwordErrorMsg.innerHTML = '';
  emailErrorMsg.innerHTML = '';
  confirmPasswordErrorMsg.innerHTML = '';
  if (!email.validity.valid) {
    if (email.classList.contains('input-field__default')) {
      email.classList.add('input-field__error');
      email.classList.remove('input-field__default');
    }
    emailErrorMsg.classList.add('error-msg');
    if (email.validity.valueMissing) {
      emailErrorMsg.textContent = 'Поле не может быть пустым';
    } else if (email.validity.typeMismatch) {
      // Если поле содержит не email-адрес,
      // отображаем следующее сообщение об ошибке
      emailErrorMsg.textContent = 'Некорректный email';
    }

    //     Задаём соответствующую стилизацию
    emailDiv.appendChild(emailErrorMsg);
  }
  if (!password.validity.valid) {
    if (password.classList.contains('input-field__default')) {
      password.classList.add('input-field__error');
      password.classList.remove('input-field__default');
    }
    passwordErrorMsg.classList.add('error-msg');
    if (password.validity.valueMissing) {
      passwordErrorMsg.textContent = 'Поле не может быть пустым';
    } else if (password.validity.tooShort) {
      passwordErrorMsg.textContent = 'Длина пароля должна быть не менее 6 символов';
    } else if (password.validity.patternMismatch) {
      console.log(password.pattern);
      console.log(password.value);
      passwordErrorMsg.textContent = 'Пароль не соответствует требуемому формату';
    }
    passwordDiv.appendChild(passwordErrorMsg);
  }
  if (confirmPassword && confirmPasswordDiv) {
    confirmPasswordErrorMsg.classList.add('error-msg');
    if (!confirmPassword.validity.valid) {
      if (confirmPassword.classList.contains('input-field__default')) {
        confirmPassword.classList.add('input-field__error');
        confirmPassword.classList.remove('input-field__default');
      }
      if (confirmPassword.validity.valueMissing) {
        confirmPasswordErrorMsg.textContent = 'Поле не может быть пустым';
      } else if (confirmPassword.validity.tooShort) {
        confirmPasswordErrorMsg.textContent = 'Длина пароля должна быть не менее 6 символов';
      } else if (confirmPassword.validity.patternMismatch) {
        confirmPasswordErrorMsg.textContent = 'Пароль не соответствует требуемому формату';
      }
      confirmPasswordDiv.appendChild(confirmPasswordErrorMsg);
    } else if (password.value !== confirmPassword.value) {
      if (confirmPassword.classList.contains('input-field__default')) {
        confirmPassword.classList.add('input-field__error');
        confirmPassword.classList.remove('input-field__default');
      }
      if (password.classList.contains('input-field__default')) {
        password.classList.add('input-field__error');
        password.classList.remove('input-field__default');
      }
      confirmPasswordErrorMsg.textContent = 'Пароли не совпадают';
      confirmPasswordDiv.appendChild(confirmPasswordErrorMsg);
    }
  }
}
