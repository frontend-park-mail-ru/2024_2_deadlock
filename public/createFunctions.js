const createInputField = (type, text, name) => {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = text;
  input.classList.add('input-field__default');

  return input;
};

export const createInputDiv = (label, type, placeholder) => {
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

export const createButton = (label, type) => {
  const button = document.createElement('button');
  button.type = type;
  button.innerHTML = label;

  return button;
};

export const createForm = (action, method) => {
  const form = document.createElement('form');
  form.noValidate = true;
  form.action = action;
  form.method = method;

  return form;
};

export const createUl = (liArr) => {
  const unorderedList = createElement('ul');
  liArr.forEach((li) => {
    item = createElement('li');
    unorderedList.appendChild(item);
  });
  return unorderedList;
};
