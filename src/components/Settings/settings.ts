'use strict';

import Handlebars from 'handlebars';
import userState from '../../user/user';
import templates from './settings.hbs';
import styles from './profile.css';
// import SettingsApi from '../../api/api_settings.ts';
import UserApi from '../../api/api_user';
import Ajax from '../../ajax/ajax';

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
    // isNameCorrect: boolean;
    // isDescriptionCorrect: boolean;
  };
  id: number;
  username: string;
  description: string;
  email: string;

  // передаём текущего пользователя прямо из запроса /me
  constructor(
    parent: Element,
    currentUser: {
      id: number;
      email: string;
      'avatar-url': string;
      'first-name': string;
      'last-name': string;
    },
  ) {
    this.id = currentUser['id'];
    this.parent = parent;
    this.context = {
      // isNameCorrect: true,
      // isDescriptionCorrect: true,
      mainDefault: MAIN_POPULAR,
      sort: SORT_BY_POPULARITY,
    };
    this.description = '';
    this.username = currentUser['first-name'];
    this.email = currentUser['email'];
  }

  async render() {
    if (this.parent) {
      const currentUser = await UserApi.getCurrentUser();
      alert(currentUser['first-name']);
      this.parent.innerHTML = templates({
        context: this.context,
        username: this.username,
        email: this.email,
      });

      // this.parent.innerHTML = templates({ user: userState, context: this.context }) as string;
      const inputCounter = document.querySelector('.input-counter');
      const inputField = document.querySelector('#name-input') as HTMLInputElement;

      inputField.value = this.username;
      const inputLength: number = inputField.value.length;

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

      const linkConfirm = document.querySelector('.link-confirm[name=name-description-save]');
      const form = document.querySelector('#name-description-form') as HTMLFormElement;
      linkConfirm?.addEventListener('click', async (event) => {
        event.preventDefault();

        form.submit();
      });
    }
  }
}

export default Settings;
