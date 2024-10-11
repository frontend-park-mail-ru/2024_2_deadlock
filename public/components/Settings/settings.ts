'use strict';
import userState from '../../user.js';

const MAINPOPULAR: string = 'mainPopular';
const MAINLATEST: string = 'mainLatest';
const MAINOWN: string = 'mainOwn';
const SORTBYPOPULARITY: string = 'sortByPopularity';
const SORTBYDATE: string = 'sortByDate';

interface Settings {
  parent: Element;
  context: {
    mainDefault: string;
    sort: string;
    description: string;
    isNameCorrect: boolean;
    isDescriptionCorrect: boolean;
  };
}

class Settings {
  constructor(parent: Element) {
    this.parent = parent;
    this.context = {
      isNameCorrect: true,
      isDescriptionCorrect: true,
      description: '',
      mainDefault: MAINPOPULAR,
      sort: SORTBYPOPULARITY,
    };
  }

  render() {
    const template = Handlebars.templates['settings.hbs'];
    this.parent.innerHTML = template({ user: userState, context: this.context });
  }
}

export default Settings;
