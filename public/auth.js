const root = document.getElementById('window');

const windowHeader = document.createElement('div');
windowHeader.classList.add('window-header');
windowHeader.innerHTML = 'DEAD-VC';
root.appendChild(windowHeader);

const windowBody = document.createElement('div');
windowBody.classList.add('window-body');

const loginSetupSliderTabs = document.createElement('div');
loginSetupSliderTabs.classList.add('login-signup-slider-tab');

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

let form = createForm('', 'get');

const renderSignup = () => {
    form = createForm('', 'post');

    const fields = document.createElement('div');

    const emailInputDiv = createInputDiv('Введите E-Mail', 'email', 'E-Mail');

    const passwordInputDiv = createInputDiv('Введите пароль', 'password', 'Пароль');

    const confirmPasswordInputDiv = createInputDiv('Подтвердите пароль', 'password', 'Подтвердите пароль');

    const submitBtn = createButton('Зарегистрироваться', 'submit');
    submitBtn.classList.add('submit-btn');

    fields.classList.add('fields');
    fields.appendChild(emailInputDiv);
    fields.appendChild(passwordInputDiv);
    fields.appendChild(confirmPasswordInputDiv);
    fields.appendChild(submitBtn);
    form.appendChild(fields);

    return form;
}

const createInputField = (type, text, name) => {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;
    input.classList.add('input-field-default');

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
        passwordControl.id = 'password-control';
        passwordControl.classList.add('password-control');

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
    form = createForm('', 'get');

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
            tab.classList.add('tab-active');
            state.activeLink = tab;
        }
        loginSetupSliderTabs.appendChild(tab);
    });
}

root.addEventListener('click', (event) => {
    const { target } = event;
    if (target.id !== 'password-control' && (target.tagName.toLowerCase() === 'a' || target instanceof HTMLAnchorElement)) {
        event.preventDefault();
        formDiv.innerHTML = '';
        state.activeLink.classList.remove('tab-active');
        target.classList.add('tab-active');
        state.activeLink = target;

        form = config.slideTabs[target.dataset.section].render
        formDiv.appendChild(form);
    }
})

renderMenu();
formDiv.appendChild(renderLogin());

const passwordControl = document.getElementById('password-control');
passwordControl.addEventListener('click', (event) => {
    if(state.hidePassword === true){
        passwordControl.classList.remove('password-control');
        passwordControl.classList.add('password-control-view');
        state.hidePassword = false;
        passwordControl.parentElement.firstChild.type = 'text';
    }
    else{        
        passwordControl.classList.remove('password-control-view');
        passwordControl.classList.add('password-control');
        state.hidePassword = true;
        passwordControl.parentElement.firstChild.type = 'password';
    }
})