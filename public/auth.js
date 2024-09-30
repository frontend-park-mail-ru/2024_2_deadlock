import Forms from './components/Forms/forms.js';

const formsContainer = document.querySelector('.auth-container');

const context = {
  isReg: false,
  isEmailCorrect: true,
  isPasswordCorrect: true,
  isPasswordRepeatCorrect: true,
};

const forms = new Forms(formsContainer, context);
forms.render();
