'use strict';
<<<<<<< HEAD

import Handlebars from 'handlebars';
import userState from '../../user/user';
import templates from './settings.hbs';
const MAIN_POPULAR = 'mainPopular';
// const MAIN_LATEST: string = 'mainLatest';
// const MAIN_OWN: string = 'mainOwn';
const SORT_BY_POPULARITY = 'sortByPopularity';
// const SORT_BY_DATE: string = 'sortByDate';
const MAX_NAME_LENGTH = 30;

class Settings {
=======
import userState from '../../user/user.js';

const MAIN_POPULAR: string = 'mainPopular';
const MAIN_LATEST: string = 'mainLatest';
const MAIN_OWN: string = 'mainOwn';
const SORT_BY_POPULARITY: string = 'sortByPopularity';
const SORT_BY_DATE: string = 'sortByDate';
const MAX_NAME_LENGTH: number = 30;

interface SettingsInterface {
>>>>>>> 80f386d (DEAD-14 feat: Modify settings styles)
  parent: Element;
  context: {
    mainDefault: string;
    sort: string;
    description: string;
    isNameCorrect: boolean;
    isDescriptionCorrect: boolean;
  };
<<<<<<< HEAD
=======
}

class Settings implements SettingsInterface {
  parent: Element;
  context: {
    mainDefault: string;
    sort: string;
    description: string;
    isNameCorrect: boolean;
    isDescriptionCorrect: boolean;
  };
>>>>>>> 80f386d (DEAD-14 feat: Modify settings styles)
  constructor(parent: Element) {
    this.parent = parent;
    this.context = {
      isNameCorrect: true,
      isDescriptionCorrect: true,
      description: '',
      mainDefault: MAIN_POPULAR,
      sort: SORT_BY_POPULARITY,
    };
  }

  render() {
    const template = templates({});
    this.parent.innerHTML = template({ user: userState, context: this.context });
    const inputCounter = document.querySelector('.input-counter');
<<<<<<< HEAD
    const inputField = document.querySelector('#name-input') as HTMLInputElement;
    inputField.value = userState.name.length.toString();
    const inputLength: number = inputField.value.length;
    console.log(inputField);
    console.log(inputLength);
    const countHandler = () => {
      if (inputCounter && inputLength) {
        const difference: number = MAX_NAME_LENGTH - inputLength;
=======
    const inputField = <HTMLInputElement>document.querySelector('#name-input');
    const inputLength: number = inputField.value.length;

    const countHandler = () => {
      if (inputCounter && inputLength) {
        var difference: number = MAX_NAME_LENGTH - inputLength;
>>>>>>> 80f386d (DEAD-14 feat: Modify settings styles)
        inputCounter.textContent = difference.toString();
      }
    };

<<<<<<< HEAD
    inputField?.addEventListener('click', () => {
      countHandler();
    });

    document.addEventListener('DOMContentLoaded', () => {
      countHandler();
    });

    Handlebars.registerHelper('split', (str) => {
      return str.split('');
    });

    const linkConfirm = document.querySelector('.link-confirm[name=name-description-save]');
    const form = document.querySelector('#name-description-form') as HTMLFormElement;
    console.log(linkConfirm);
    linkConfirm?.addEventListener('click', (event) => {
      event.preventDefault();
      form.submit();
    });
=======
    inputField?.addEventListener('click', (event) => {
      alert('fyhtf');
      countHandler();
    });

    document.addEventListener('DOMContentLoaded', (event) => {
      countHandler();
    });
>>>>>>> 80f386d (DEAD-14 feat: Modify settings styles)
  }
}

export default Settings;
