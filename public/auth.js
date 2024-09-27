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

const createForm = (action, method) => {
    const form = document.createElement('form');
    form.action = action;
    form.method = method;
    
    return form;
}

let form = createForm('', 'post');

const renderSignup = () => {
    form = createForm('', 'post');

    const fields = document.createElement('div');

    const emailInputDiv = createInputDiv('Введите E-Mail', 'email', 'E-Mail');

    const passwordInputDiv = createInputDiv('Введите пароль', 'password', 'Пароль');

    const confirmPasswordInputDiv = createInputDiv('Подтвердите пароль', 'password', 'Подтвердите пароль');

    const submitBtn = createButton('Зарегистрироваться', 'submit');
    submitBtn.classList.add('submit-btn');

    const reminderDiv = document.createElement('div');
    reminderDiv.classList.add('reminder');
    const reminder = document.createElement('span');
    reminder.innerHTML = 'Пароль должен быть длиной от 6 до 255 символов и содержать только:';
    
    const unorderedList = document.createElement('ul');
    const req1 = document.createElement('li');
    const req2 = document.createElement('li');
    const req3 = document.createElement('li');

    req1.innerHTML = 'строчные и прописные латинские буквы';
    req2.innerHTML = 'цифры (0-9)';
    req3.innerHTML = 'специальные символы !, ?, _, -, *, $';
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

    return form;
}

const createInputField = (type, text, name) => {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;
    input.classList.add('input-field__default');

    return input;
}

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
    if (inputFieldDiv.firstChild.type === 'password'){
        const passwordControl = document.createElement('a');
        passwordControl.href = '#';
        passwordControl.classList.add('password-control__hide');
        // passwordControl.dataset.section = 'password-control';

        inputFieldDiv.appendChild(passwordControl);
    }


    inputDiv.appendChild(inputText);
    inputDiv.appendChild(inputFieldDiv);
    
    return inputDiv;
}

const createButton = (label, type) => {
    const button = document.createElement('button');
    button.type = type;
    button.innerHTML = label;
    
    return button;
}

const renderLogin = () => {
    form = createForm('', 'post');

    const fields = document.createElement('div');

    const emailInputDiv = createInputDiv('Введите E-Mail', 'email', 'E-Mail');

    const passwordInputDiv = createInputDiv('Введите пароль', 'password', 'Пароль');

    const submitBtn = createButton('Войти', 'submit');
    submitBtn.classList.add('submit-btn');

    fields.classList.add('fields');
    fields.appendChild(emailInputDiv);
    fields.appendChild(passwordInputDiv);
    fields.appendChild(submitBtn);
    form.appendChild(fields);

    return form;
}

const config = {
    slideTabs: {
        loginTab: {
            href: '/login',
            text: 'Вход',
            render: renderLogin()
        },
        
        signupTab: {
            href: '/signup',
            text: 'Регистрация',
            render: renderSignup()
        }
    }
}

const state = {
    activeLink: null,
    hidePassword: true
}

const renderMenu = () => {
    Object.entries(config.slideTabs).forEach(([key, {href, text}], index) => {
        const tab = document.createElement('a');
        tab.href = href;
        tab.text = text;
        tab.dataset.section = key;
    
        if(index === 0){
            tab.classList.add('slider-tabs__active');
            state.activeLink = tab;
        }
        loginSetupSliderTabs.appendChild(tab);
    });
}

root.addEventListener('click', (event) => {
    const { target } = event;
    if (!(target.classList.contains('password-control__hide') || target.classList.contains('password-control__view'))
        && (target.tagName.toLowerCase() === 'a' || target instanceof HTMLAnchorElement)) {
        event.preventDefault();
        formDiv.innerHTML = '';
        state.activeLink.classList.remove('slider-tabs__active');
        target.classList.add('slider-tabs__active');
        state.activeLink = target;

        form = config.slideTabs[target.dataset.section].render
        formDiv.appendChild(form);
    }
})

renderMenu();
formDiv.appendChild(renderLogin());

const passwordControl = document.getElementsByClassName('password-control').item(0);
passwordControl.addEventListener('click', (event) => {
    if(state.hidePassword === true){
        passwordControl.classList.add('password-control__view');
        passwordControl.classList.remove('password-control__hide');
        state.hidePassword = false;
        passwordControl.parentElement.firstChild.type = 'text';
    }
    else{        
        passwordControl.classList.remove('password-control__view');
        passwordControl.classList.add('password-control__hide');
        state.hidePassword = true;
        passwordControl.parentElement.firstChild.type = 'password';
    }
})