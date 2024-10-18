'use strict';

import userState from '../../user/user.js';
import Handlebars from 'handlebars';
const MAIN_POPULAR: string = 'mainPopular';
const MAIN_LATEST: string = 'mainLatest';
const MAIN_OWN: string = 'mainOwn';
const SORT_BY_POPULARITY: string = 'sortByPopularity';
const SORT_BY_DATE: string = 'sortByDate';
const MAX_NAME_LENGTH: number = 30;

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
    const inputField = <HTMLInputElement>document.querySelector('#name-input');
    const inputLength: number = inputField.value.length;
    console.log(inputField);
    console.log(inputLength);
    const countHandler = () => {
      if (inputCounter && inputLength) {
        var difference: number = MAX_NAME_LENGTH - inputLength;
        inputCounter.textContent = difference.toString();
      }
    };

    inputField?.addEventListener('click', (event) => {
      countHandler();
    });

    document.addEventListener('DOMContentLoaded', (event) => {
      countHandler();
    });

    Handlebars.registerHelper('split', (str) => {
      return str.split('');
    });
  }
}

export default Settings;
