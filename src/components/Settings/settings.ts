'use strict';

import userState from '../../user/user.ts';
import Handlebars from 'handlebars';
const MAIN_POPULAR = 'mainPopular';
// const MAIN_LATEST: string = 'mainLatest';
// const MAIN_OWN: string = 'mainOwn';
const SORT_BY_POPULARITY = 'sortByPopularity';
// const SORT_BY_DATE: string = 'sortByDate';
const MAX_NAME_LENGTH = 30;

class Settings {
  parent: Element;
  context: {
    mainDefault: string;
    sort: string;
    description: string;
    isNameCorrect: boolean;
    isDescriptionCorrect: boolean;
  };
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
    const template = Handlebars.templates['settings.hbs'];
    this.parent.innerHTML = template({ user: userState, context: this.context });
    const inputCounter = document.querySelector('.input-counter');
    const inputField = document.querySelector('#name-input') as HTMLInputElement;
    inputField.value = userState.name.length.toString();
    const inputLength: number = inputField.value.length;
    console.log(inputField);
    console.log(inputLength);
    const countHandler = () => {
      if (inputCounter && inputLength) {
        const difference: number = MAX_NAME_LENGTH - inputLength;
        inputCounter.textContent = difference.toString();
      }
    };

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
  }
}

export default Settings;
